import assert from 'node:assert/strict';
import test from 'node:test';
import { defaultRelease, releaseRoot, validateRelease, readCatalog } from '../tools/catalog.mjs';
import { article } from '../tools/prepare-docs.mjs';
import { readFile } from 'node:fs/promises';
import { exactPackage, assertNewRelease } from '../tools/npm-api.mjs';

test('API imports accept exact package versions and reject moving references', () => {
  assert.deepEqual(exactPackage('@faeyumbrea/lib-camera-api-types@1.14.0'), { name: '@faeyumbrea/lib-camera-api-types', version: '1.14.0' });
  for (const spec of ['@faeyumbrea/lib-camera-api-types@latest', 'camera@^1.0.0', 'camera@1', 'camera@1.0.0/../../']) assert.throws(() => exactPackage(spec));
});

test('a subsequent import cannot rewrite an older release API mapping', () => {
  const module = { id: 'camera', releases: [{ channel: 'public', version: '1.0.0', api: { version: '1.0.0' } }] };
  assert.throws(() => assertNewRelease(module, 'public', '1.0.0'), /immutable/);
  assert.doesNotThrow(() => assertNewRelease(module, 'public', '1.0.1'));
  assert.equal(module.releases[0].api.version, '1.0.0');
});

test('public default cannot be replaced by a newer early-access release', () => {
  const publicRelease = { channel: 'public', version: '1.0.0' };
  const module = { releases: [{ channel: 'early-access', version: '2.0.0' }, publicRelease] };
  assert.equal(defaultRelease(module), publicRelease);
});

test('premium-only modules default to their latest published release', () => {
  const published = { channel: 'premium', version: '2.0.0' };
  assert.equal(defaultRelease({ releases: [published, { channel: 'legacy', version: 'current', legacy: true }] }), published);
});

test('latest selection is independent of catalog ordering', () => {
  const newest = { channel: 'public', version: '1.14.0' };
  assert.equal(defaultRelease({ releases: [{ channel: 'public', version: '1.9.0' }, newest] }), newest);
});

test('version URLs remain pinned when the default changes', () => {
  assert.equal(releaseRoot('lib-camera', { channel: 'public', version: '1.13.0' }), '/lib-camera/public/1.13.0/');
});

test('released pages need tag provenance and complete API provenance', () => {
  assert.throws(() => validateRelease({ channel: 'public', version: '1.0.0' }));
  assert.throws(() => validateRelease({ channel: 'public', version: '1.0.0', tag: 'v1.0.0', manifest: 'release.json', api: { version: '1.0.0' } }));
  assert.throws(() => validateRelease({ channel: 'public', version: '../../main' }));
});

test('migrated articles keep prose, code, and the declared title', () => {
  const converted = article('---\ntitle: Camera controls\n---\n\n# Old title\n\nKeep this prose.\n\n```js\nconst api = game.modules.get("lib-camera").api;\n```', 'Fallback');
  assert.equal(converted.title, 'Camera controls');
  assert.match(converted.body, /Keep this prose/);
  assert.match(converted.body, /const api/);
  assert.doesNotMatch(converted.body, /# Old title/);
});

test('every catalog release has a guide and API metadata matches the released package', async () => {
  const catalog = await readCatalog();
  for (const module of catalog) {
    for (const release of module.releases) {
      validateRelease(release);
      if (!release.legacy) await readFile(`${release.source}/user/index.md`);
      if (release.api) {
        const api = JSON.parse(await readFile(`releases/${module.id}/${release.channel}/${release.version}/api/package.json`, 'utf8'));
        assert.equal(api.version, release.api.version);
        assert.equal(api.name, release.api.name);
      }
    }
  }
});
