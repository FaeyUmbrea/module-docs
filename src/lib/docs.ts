import catalog from '../../releases/catalog.json';

export interface Release {
  channel: string;
  version: string;
  legacy?: boolean;
  tag?: string;
  repository?: string;
  manifest?: string;
  source: string;
  oldBase?: string;
  api?: { name: string; version: string; asset: string; sha256: string };
}
export interface DocModule {
  id: string;
  title: string;
  summary: string;
  repositories: Record<string, string | undefined>;
  releases: Release[];
}
const channelOrder = ['public', 'early-access', 'premium', 'legacy'];
export const modules: DocModule[] = catalog.map((module) => ({
  ...module,
  releases: [...module.releases].sort((a, b) => channelOrder.indexOf(a.channel) - channelOrder.indexOf(b.channel) || b.version.localeCompare(a.version, undefined, { numeric: true })),
}));
export const channelLabels: Record<string, string> = { public: 'Public', 'early-access': 'Early access', premium: 'Premium', legacy: 'Legacy' };

export function preferredRelease(module: DocModule) {
  const newestFirst = [...module.releases].sort((a, b) => b.version.localeCompare(a.version, undefined, { numeric: true }));
  return newestFirst.find((release) => release.channel === 'public' && !release.legacy)
    ?? newestFirst.find((release) => !release.legacy)
    ?? newestFirst[0];
}

export function releaseUrl(moduleId: string, release: Release, audience = 'user') {
  return `/${moduleId}/${release.channel}/${release.version}/${audience}/`;
}
