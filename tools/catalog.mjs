import { readFile } from 'node:fs/promises';

export const channels = { public: 'Public', 'early-access': 'Early access', premium: 'Premium', legacy: 'Legacy' };

export function releaseRoot(moduleId, release) {
  return `/${moduleId}/${release.channel}/${release.version}/`;
}

export function defaultRelease(module) {
  const newestFirst = [...module.releases].sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));
  return newestFirst.find((release) => release.channel === 'public' && !release.legacy)
    ?? newestFirst.find((release) => !release.legacy)
    ?? newestFirst[0];
}

export async function readCatalog() {
  return JSON.parse(await readFile(new URL('../releases/catalog.json', import.meta.url), 'utf8'));
}

export function validateRelease(release) {
  if (!Object.hasOwn(channels, release.channel)) throw new Error('Unknown documentation channel');
  if (!/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(release.version)) throw new Error('Invalid documentation version');
  if (!release.legacy && (!release.tag || !release.manifest)) throw new Error('A released page needs a tagged manifest');
  if (release.api && (!release.api.version || !release.api.sha256 || !release.api.asset)) {
    throw new Error('API provenance must include its package version, asset, and digest');
  }
  if (release.api?.source === 'npm' && (!release.api.integrity || !release.api.filesSha256)) throw new Error('npm API provenance needs archive integrity and a snapshot digest');
}
