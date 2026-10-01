import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Application } from 'typedoc';
import { readCatalog, releaseRoot, validateRelease } from './catalog.mjs';
import { packageDigest } from './npm-api.mjs';

const root = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const output = path.join(root, 'src/content/docs');

export async function files(directory) {
  const result = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...await files(file));
    else result.push(file);
  }
  return result;
}

export function slug(file) {
  return file.replace(/\.(md|mdx)$/, '').replace(/(^|\/)index$/, '$1').replace(/\/$/, '').toLowerCase();
}

export function article(raw, fallbackTitle) {
  const frontmatter = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  const declaredTitle = frontmatter?.[1].match(/^title:\s*(.+)$/m)?.[1].replace(/^["']|["']$/g, '');
  let body = frontmatter ? raw.slice(frontmatter[0].length) : raw;
  const heading = body.match(/^# (.+)$/m);
  const title = declaredTitle ?? heading?.[1] ?? fallbackTitle;
  if (heading) body = body.replace(heading[0], '').trimStart();
  body = body.replace(/^:{3,}(info|warning|tip|note|danger)(.*)$/gm, (_, kind, rest) => `:::${({ info: 'note', warning: 'caution' })[kind] ?? kind}${rest}`).replace(/^:{3,}\s*$/gm, ':::');
  return { title, body };
}

function rewriteLinks(body, sourceFile, moduleId, release, destinations) {
  const base = releaseRoot(moduleId, release);
  return body.replace(/(!?\[[^\]]*\])\(([^\s)]+)([^)]*)\)/g, (match, label, href, suffix) => {
    if (/^(https?:|mailto:|#|\/)/.test(href)) return match;
    const [target, anchor] = href.split('#');
    const resolved = path.normalize(path.join(path.dirname(sourceFile), target));
    const doc = destinations.get(resolved) ?? destinations.get(`${resolved}.md`);
    if (doc) return `${label}(${base}${doc}${anchor ? `#${anchor}` : ''}${suffix})`;
    if (/\.(png|gif|jpe?g|svg|webp)$/i.test(target)) {
      return `${label}(/media/${moduleId}/${release.channel}/${release.version}/${resolved}${suffix})`;
    }
    return match;
  });
}

async function renderSource(module, release, source, audienceOverride) {
  const absolute = path.join(root, source);
  const sourceFiles = await files(absolute);
  const markdown = sourceFiles.filter((file) => /\.(md|mdx)$/.test(file));
  const destinations = new Map();
  for (const file of markdown) {
    const relative = path.relative(absolute, file);
    const audience = audienceOverride ?? (/^(api|director-api)(\.|-reference\/)/.test(relative) ? 'dev' : 'user');
    const page = audienceOverride ? relative.replace(/^(user|dev)\//, '') : relative;
    destinations.set(relative, `${audience}/${slug(page)}${slug(page) ? '/' : ''}`);
  }
  for (const file of sourceFiles) {
    const relative = path.relative(absolute, file);
    if (!/\.(md|mdx)$/.test(file)) {
      if (/\.(png|gif|jpe?g|svg|webp)$/i.test(file)) {
        const image = path.join(root, 'public/media', module.id, release.channel, release.version, relative);
        await mkdir(path.dirname(image), { recursive: true });
        await cp(file, image);
      }
      continue;
    }
    let audience = audienceOverride;
    let page = relative;
    if (relative.startsWith('user/') || relative.startsWith('dev/')) {
      [audience] = relative.split('/');
      page = relative.slice(audience.length + 1);
    } else {
      audience ??= /^(api|director-api)(\.|-reference\/)/.test(relative) ? 'dev' : 'user';
    }
    const route = `${audience}/${slug(page)}${slug(page) ? '/' : ''}`;
    destinations.set(relative, route);
  }
  for (const file of markdown) {
    const relative = path.relative(absolute, file);
    const route = destinations.get(relative);
    const audience = route.split('/')[0];
    const { title, body } = article(await readFile(file, 'utf8'), path.basename(file, '.md'));
    const order = route === `${audience}/` ? 0 : /getting-started|quick-start/.test(route) ? 1 : 50;
    await writePage(module, release, route, title === 'Welcome' ? module.title : title, rewriteLinks(body, relative, module.id, release, destinations), order);
  }
}

async function writePage(module, release, route, title, body, order = 50) {
  const destination = path.join(output, module.id, release.channel, release.version, route, 'index.md');
  await mkdir(path.dirname(destination), { recursive: true });
  const fields = { title, moduleId: module.id, channel: release.channel, version: release.version, audience: route.split('/')[0], legacy: Boolean(release.legacy), order, editUrl: false };
  await writeFile(destination, `---\n${Object.entries(fields).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join('\n')}\n---\n\n${body}\n`);
}

export async function prepareDocs() {
  await rm(output, { recursive: true, force: true });
  await mkdir(output, { recursive: true });
  const catalog = await readCatalog();
  for (const module of catalog) {
    for (const release of module.releases) {
      validateRelease(release);
      await renderSource(module, release, release.source);
      if (release.api) {
        const directory = path.join(root, 'releases', module.id, release.channel, release.version, 'api');
        if (release.api.filesSha256 && await packageDigest(directory) !== release.api.filesSha256) throw new Error(`API snapshot changed for ${module.id} ${release.version}`);
        const apiOutput = path.join(root, '.release-cache/typedoc', module.id, release.channel, release.version);
        await rm(apiOutput, { recursive: true, force: true });
        await mkdir(apiOutput, { recursive: true });
        const apiConfig = path.join(apiOutput, 'tsconfig.json');
        await writeFile(apiConfig, JSON.stringify({ compilerOptions: { target: 'ES2022', module: 'NodeNext', moduleResolution: 'NodeNext', skipLibCheck: true }, include: [`${directory}/**/*.d.ts`] }));
        const app = await Application.bootstrapWithPlugins({
          entryPoints: [path.join(directory, 'public-api.d.ts')],
          tsconfig: apiConfig,
          plugin: ['typedoc-plugin-markdown'],
          readme: 'none',
          skipErrorChecking: true,
          excludePrivate: true,
          excludeInternal: true,
          entryFileName: 'index.md',
          useHTMLAnchors: true,
          outputFileStrategy: 'members',
          outputs: [{ name: 'markdown', path: apiOutput }],
        });
        const project = await app.convert();
        if (!project) throw new Error(`Could not generate ${module.title} API ${release.api.version}`);
        await app.generateOutputs(project);
        const apiSource = path.relative(root, apiOutput);
        await renderSource(module, { ...release, source: apiSource }, apiSource, 'dev');
        // The reference index is separate from the handwritten integration guide.
        const index = path.join(output, module.id, release.channel, release.version, 'dev/index.md');
        const generated = await readFile(index, 'utf8');
        await mkdir(path.join(path.dirname(index), 'api-reference'), { recursive: true });
        await writeFile(path.join(path.dirname(index), 'api-reference/index.md'), generated.replace(/^title:.*$/m, 'title: "API reference"'));
        await renderSource(module, release, release.source);
      }
      const devIndex = path.join(output, module.id, release.channel, release.version, 'dev/index.md');
      try { await readFile(devIndex); } catch {
        await writePage(module, release, 'dev/', 'Developer docs', release.api
          ? `The API reference is generated from the released **${release.api.name} ${release.api.version}** declaration archive.\n\n[Open the API reference](./api-reference/)`
          : `This release does not include a published API type package.\n\n${release.legacy ? 'The preserved developer pages below describe the older documentation and may not match a released API.' : 'Use the release’s existing integration guide where available. A reference generated from development source would not describe this release reliably.'}`, 0);
      }
    }
  }
  // Starlight reads this entry for its reserved 404 route; exclude it from the normal page routes.
  await writeFile(path.join(output, '404.md'), '---\ntitle: Page not found\ndraft: true\npagefind: false\n---\n\nThat page has moved, or doesn’t exist yet. [Find your module](/) to get back to its docs.\n');
  await writeFile(path.join(output, 'index.md'), `---\ntitle: Module documentation\ndescription: Guides and API references for Void Monster Foundry modules.\ntemplate: splash\nhero:\n  title: Foundry tools from the void.\n  tagline: Setup, guides, and APIs for the Foundry modules I build. Find your module, pick your release, and make yourself at home.\n---\n`);
}

export async function redirects() {
  const result = {};
  const catalog = await readCatalog();
  for (const module of catalog) {
    const legacy = module.releases.filter((release) => release.legacy);
    for (const release of legacy) {
      if (!release.oldBase) continue;
      const source = path.join(root, release.source);
      for (const file of (await files(source)).filter((name) => /\.md$/.test(name))) {
        const relative = path.relative(source, file);
        const audience = /^(api|director-api)(\.|-reference\/)/.test(relative) ? 'dev' : 'user';
        const old = `${release.oldBase}/${slug(relative)}`.replace(/\/$/, '');
        if (old === `/${module.id}`) continue;
        result[old] = `${releaseRoot(module.id, release)}${audience}/${slug(relative)}${slug(relative) ? '/' : ''}`;
      }
    }
  }
  result['/index'] = '/';
  result['/ethereal-plane/getting-started'] = '/ethereal-plane/legacy/current/user/quick-start/';
  result['/lib-camera'] = '/lib-camera/public/1.14.0/user/';
  return result;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await prepareDocs();
  console.log('Prepared release guides and API references');
}
