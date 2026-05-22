---
id: migrate-from-v4
title: Migrate from v4
sidebar_label: Migrate from v4
---

# Migrate from v4

V5 rewrote the overlay model. Most worlds upgrade cleanly because OBS Utils auto-migrates the data shape.

**Upgrading 5.0 → 5.1:** any `type: 'roll'` overlay is automatically converted in-place to a `wysiwyg` (canvas) tile-per-player layer with a `core.onPlayerRoll` transition. You don't need to run any snippet — the migration runs once on first load and the result appears in your Layers panel as normal.

**Upgrading 4.x → 5.1 directly:** the legacy flat `rollOverlay*` settings from V4 are not registered in V5, so there is nothing to auto-migrate. If you customised those settings and want them back, paste the V5.1+ snippet below into your browser console (F12) with your world open.

## On V5.0

Use this snippet to rebuild your old roll overlay as a `'roll'`-type layer. The V5.0 model still ships that layer type. **Note:** a `type: 'roll'` layer created this way will be automatically converted to a `wysiwyg` canvas layer when you upgrade to V5.1 — you won't need to run the snippet again.

```js
(async () => {
  const MOD = 'obs-utils';
  const get = k => game.settings.get(MOD, k);
  const set = (k, v) => game.settings.set(MOD, k, v);

  const config = {
    preRollEnabled:  get('rollOverlayPreRollEnabled')  ?? false,
    preRollDelay:    get('rollOverlayPreRollDelay')    ?? 0,
    preRollFadeIn:   get('rollOverlayPreRollFadeIn')   ?? 0,
    preRollFadeOut:  get('rollOverlayPreRollFadeOut')  ?? 0,
    preRollStay:     get('rollOverlayPreRollStay')     ?? 0,
    preRollImage:    get('rollOverlayPreRollImage')    ?? '',
    rollFadeIn:      get('rollOverlayRollFadeIn')      ?? 0,
    rollFadeOut:     get('rollOverlayRollFadeOut')     ?? 0,
    rollStay:        get('rollOverlayRollStay')        ?? 5000,
    rollBackground:  get('rollOverlayRollBackground')  ?? '',
    rollForeground:  get('rollOverlayRollForeground')  ?? '',
    postRollEnabled: get('rollOverlayPostRollEnabled') ?? false,
    postRollFadeIn:  get('rollOverlayPostRollFadeIn')  ?? 0,
    postRollFadeOut: get('rollOverlayPostRollFadeOut') ?? 0,
    postRollStay:    get('rollOverlayPostRollStay')    ?? 0,
    postRollImage:   get('rollOverlayPostRollImage')   ?? '',
  };

  const overlays = (get('streamOverlays') ?? []).slice();
  if (overlays.some(o => o.type === 'roll')) {
    return ui.notifications.warn('OBS Utils: roll overlay already exists; not adding a duplicate.');
  }
  overlays.push({
    id: foundry.utils.randomID(),
    type: 'roll',
    name: 'Roll Overlay',
    enabled: true,
    components: [],
    style: '',
    config,
  });
  await set('streamOverlays', overlays);
  ui.notifications.info('OBS Utils: V4 roll overlay settings recovered as a new layer.');
})();
```

## On V5.1+

The `'roll'` layer type no longer exists in V5.1 — it was replaced by the generic trigger system on WYSIWYG layers. This snippet is only needed if you are upgrading directly from **4.x → 5.1** and want to recover your customised roll overlay settings. It builds an equivalent WYSIWYG layer with a `core.onPlayerRoll` trigger that fires whenever a public roll lands in chat.

Under the hood the snippet calls `game.modules.get('obs-utils').api.buildLegacyRollOverlayCanvas(config)`. That API method is also available to module authors who need to construct the same overlay shape programmatically.

```js
(async () => {
  const MOD = 'obs-utils';
  const get = k => game.settings.get(MOD, k);
  const set = (k, v) => game.settings.set(MOD, k, v);
  const rid = () => foundry.utils.randomID();

  const c = {
    preRollStay:    get('rollOverlayPreRollStay')    ?? 0,
    rollFadeIn:     get('rollOverlayRollFadeIn')     ?? 200,
    rollFadeOut:    get('rollOverlayRollFadeOut')    ?? 200,
    rollStay:       get('rollOverlayRollStay')       ?? 5000,
    rollBackground: get('rollOverlayRollBackground') ?? '',
    rollForeground: get('rollOverlayRollForeground') ?? '',
    postRollStay:   get('rollOverlayPostRollStay')   ?? 0,
  };

  const components = [];
  if (c.rollBackground) {
    components.push({
      id: rid(), type: 'img', data: c.rollBackground, style: '',
      customCSS: 'img { width: 100%; height: 100%; object-fit: contain; }',
      x: 760, y: 440, w: 400, h: 200,
    });
  }
  if (c.rollForeground) {
    components.push({
      id: rid(), type: 'img', data: c.rollForeground, style: '',
      customCSS: 'img { width: 100%; height: 100%; object-fit: contain; }',
      x: 760, y: 440, w: 400, h: 200,
    });
  }
  components.push({
    id: rid(), type: 'pt', data: 'trigger.total', style: '',
    customCSS: 'font-size: 96px; font-weight: 900; color: white; text-align: center; line-height: 200px; text-shadow: 0 0 24px black;',
    x: 760, y: 440, w: 400, h: 200,
  });

  const overlay = {
    id: rid(),
    type: 'wysiwyg',
    name: 'Migrated Roll Overlay',
    enabled: true,
    components,
    style: '',
    config: { w: 1920, h: 1080 },
    trigger: {
      eventKey: 'core.onPlayerRoll',
      conditions: {},
      duration: c.preRollStay + c.rollStay + c.postRollStay,
      showMs: c.rollFadeIn,
      hideMs: c.rollFadeOut,
      transition: 'fade',
    },
  };

  const overlays = (get('streamOverlays') ?? []).slice();
  overlays.push(overlay);
  await set('streamOverlays', overlays);
  ui.notifications.info('OBS Utils: V4 roll overlay rebuilt as a WYSIWYG + trigger layer.');
})();
```

Refresh the page after running either snippet. The overlay appears in your Layers panel — rename, disable, or delete it like any other.

## What if I want it gone?

You don't have to run anything. The legacy `rollOverlay…` settings sit untouched on a fresh V5 world; the V5 model just doesn't read them by default. If you never customised your V4 roll overlay, there's nothing to recover.

## Why the V5.1 conversion is an approximation

The V4 roll overlay played a three-phase animation (pre-roll → roll → post-roll) with separate timing per phase. The V5.1 trigger system uses a single visibility window with one entrance and one exit transition. The snippet collapses the three phases into one combined window with summed durations — close enough for most users, but not pixel-identical. If you want the original phased behaviour, rebuild the overlay from scratch using three WYSIWYG layers, each triggered on `core.onPlayerRoll` with different show/hide timings.
