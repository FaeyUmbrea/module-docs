import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { channels, readCatalog } from './catalog.mjs';
import { assertNewRelease, importNpmApi } from './npm-api.mjs';

// Import an explicit release. Never follow a branch tip or publish from this tool.
const [moduleId, channel, tag, apiSpec] = process.argv.slice(2);
const catalog = await readCatalog();
const module = catalog.find((item) => item.id === moduleId);
if (!module || !Object.hasOwn(channels, channel) || !module.repositories[channel] || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(tag ?? '')) {
  throw new Error('Usage: yarn release:import <module> <public|early-access|premium> <release-tag> [api-package@exact-version]');
}
const repository = module.repositories[channel];
const release = JSON.parse(execFileSync('gh', ['api', `repos/${repository}/releases/tags/${tag}`], { encoding: 'utf8' }));
if (release.draft) throw new Error('Draft releases are not published documentation sources');
const manifestAsset = release.assets.find((asset) => asset.name === 'module.json');
if (!manifestAsset) throw new Error('The release has no module.json artifact');
const temp = await mkdtemp(path.join(tmpdir(), 'module-docs-release-'));
try {
  execFileSync('gh', ['release', 'download', tag, '--repo', repository, '--pattern', 'module.json', '--dir', temp]);
  const manifest = JSON.parse(await readFile(path.join(temp, 'module.json'), 'utf8'));
  const version = manifest.version;
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(version) || version !== tag.replace(/^v/, '')) throw new Error('Manifest and release tag versions differ');
  assertNewRelease(module, channel, version);
  if (release.assets.some(asset => asset.name.endsWith('-api-types.tgz')) && !apiSpec) throw new Error('This release exports an API; supply its exact published npm package version');
  const destination = path.resolve('releases', moduleId, channel, version);
  await mkdir(destination, { recursive: true });
  await writeFile(path.join(destination, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  const entry = { channel, version, tag, repository, manifest: manifestAsset.browser_download_url, source: `content/${moduleId}/${channel}/${version}` };
  if (apiSpec) entry.api = await importNpmApi(apiSpec, path.join(destination, 'api'));
  module.releases.push(entry);
  module.releases.sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));
  await writeFile('releases/catalog.json', `${JSON.stringify(catalog, null, 2)}\n`);
  console.log(`Imported ${module.title} ${channel} ${version}${entry.api ? ` (API ${entry.api.version})` : ''}`);
} finally {
  await rm(temp, { recursive: true, force: true });
}
