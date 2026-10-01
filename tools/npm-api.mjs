import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { cp, mkdir, mkdtemp, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';

export function exactPackage(spec) {
  const match = /^((@[a-z0-9._-]+\/)?[a-z0-9._-]+)@((0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[a-zA-Z0-9.-]+)?)$/.exec(spec ?? '');
  if (!match) throw new Error('Use an exact npm package version, never latest, a range or a tag');
  return { name: match[1], version: match[3] };
}

export function assertNewRelease(module, channel, version) {
  if (module.releases.some(item => item.channel === channel && item.version === version)) {
    throw new Error(`${module.id} ${channel} ${version} is already imported; its API mapping is immutable`);
  }
}

export async function packageDigest(directory) {
  const hash = createHash('sha256');
  async function visit(folder, prefix = '') {
    for (const entry of (await readdir(folder, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
      const relative = `${prefix}${entry.name}`;
      if (entry.isDirectory()) await visit(path.join(folder, entry.name), `${relative}/`);
      else if (entry.isFile()) hash.update(relative).update('\0').update(await readFile(path.join(folder, entry.name))).update('\0');
      else throw new Error(`Unexpected package entry: ${relative}`);
    }
  }
  await visit(directory);
  return hash.digest('hex');
}

export async function importNpmApi(spec, destination) {
  const expected = exactPackage(spec);
  const temp = await mkdtemp(path.join(tmpdir(), 'docs-npm-api-'));
  try {
    const dist = JSON.parse(execFileSync('npm', ['view', spec, 'dist', '--json'], { encoding: 'utf8' }));
    const [packed] = JSON.parse(execFileSync('npm', ['pack', spec, '--ignore-scripts', '--json', '--pack-destination', temp], { encoding: 'utf8' }));
    if (packed.name !== expected.name || packed.version !== expected.version || packed.integrity !== dist.integrity) throw new Error('npm package provenance mismatch');
    if (packed.files.some(file => file.path.split('/').some(part => part === '..' || part === '.') || file.path.startsWith('/') || /\.(m?js|cjs)$/.test(file.path))) throw new Error('API packages must contain declarations only');
    const archive = path.join(temp, packed.filename);
    const listing = execFileSync('tar', ['-tvzf', archive], { encoding: 'utf8' });
    if (listing.split('\n').filter(Boolean).some(line => !['-', 'd'].includes(line[0]))) throw new Error('API archive contains links or special files');
    const members = execFileSync('tar', ['-tzf', archive], { encoding: 'utf8' }).trim().split('\n');
    if (members.some(name => !name.startsWith('package/') || name.split('/').includes('..'))) throw new Error('Unexpected API archive paths');
    execFileSync('tar', ['-xzf', archive, '-C', temp]);
    const directory = path.join(temp, 'package');
    const manifest = JSON.parse(await readFile(path.join(directory, 'package.json'), 'utf8'));
    if (manifest.name !== expected.name || manifest.version !== expected.version) throw new Error('API manifest mismatch');
    await readFile(path.join(directory, 'public-api.d.ts'));
    const filesSha256 = await packageDigest(directory);
    await mkdir(path.dirname(destination), { recursive: true });
    await cp(directory, destination, { recursive: true, errorOnExist: true, force: false });
    return { source: 'npm', ...expected, asset: dist.tarball, integrity: dist.integrity, sha256: createHash('sha256').update(await readFile(archive)).digest('hex'), filesSha256 };
  } finally {
    await rm(temp, { recursive: true, force: true });
  }
}
