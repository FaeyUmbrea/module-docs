---
id: migrate-from-v4
title: Migrate from v4
sidebar_label: Migrate from v4
---

# Migrate from v4

V5 rewrote the overlay model. Most worlds upgrade cleanly because OBS Utils auto-migrates the data shape. **The one thing that does not migrate automatically is a customised V4 roll overlay** — V5's automatic migration intentionally skips it (the customisations were rare and the new model is different enough that an opinionated auto-conversion would mis-translate as often as it'd help).

If you customised your V4 roll overlay and want those settings back on V5, paste the snippet below into your browser console (F12) with your world open.

## What the snippet does

Reads every `rollOverlayPre…` / `rollOverlay…` / `rollOverlayPost…` setting your world still has from V4, builds a fresh `'roll'`-type layer with that config, and appends it to your `streamOverlays`. Safe to run on a world that already has a roll layer — it will skip in that case rather than create a duplicate.

## The snippet (V5.0)

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

Refresh the page after running it. The overlay will appear in your Layers panel — you can rename it, disable it, or delete it like any other.

## What if I want it gone?

You don't have to run anything. The legacy `rollOverlay…` settings sit untouched on a fresh V5 world; the V5 model just doesn't read them by default. If you never customised your V4 roll overlay, there's nothing to recover.
