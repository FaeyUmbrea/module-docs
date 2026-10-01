import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { files } from './prepare-docs.mjs';

const build = path.resolve('build');
const allFiles = await files(build);
const known = new Set(allFiles);
const html = new Map();
const failures = [];
for (const file of allFiles.filter((name) => name.endsWith('.html'))) html.set(file, await readFile(file, 'utf8'));
for (const [file, text] of html) {
  const page = `/${path.relative(build, file).replace(/index\.html$/, '')}`;
  for (const match of text.matchAll(/\b(?:href|src)="([^"]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (/^(https?:|mailto:|tel:|data:|javascript:)/.test(href)) continue;
    const url = new URL(href, `http://local${page}`);
    const target = path.join(build, decodeURIComponent(url.pathname));
    const candidates = [target, path.join(target, 'index.html'), `${target}.html`];
    const destination = candidates.find((name) => known.has(name));
    if (!destination) { failures.push(`${page} → ${href}`); continue; }
    if (url.hash && destination.endsWith('.html')) {
      const id = decodeURIComponent(url.hash.slice(1));
      const targetHtml = html.get(destination);
      if (!targetHtml?.includes(`id="${id}"`) && !targetHtml?.includes(`name="${id}"`)) failures.push(`${page} → missing anchor ${href}`);
    }
  }
}
if (failures.length) {
  console.error([...new Set(failures)].join('\n'));
  throw new Error(`${failures.length} broken internal links`);
}
console.log(`Checked internal links and anchors across ${html.size} pages`);
