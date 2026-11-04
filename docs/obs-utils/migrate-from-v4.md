---
id: migrate-from-v4
title: Migrate from v4
sidebar_label: Migrate from v4
---

# Migrate from v4

Back up your world before upgrading. Keep a copy of any customised roll-overlay timings and image paths from V4.

OBS Utils 5.1 and newer use animation tracks instead of the dedicated Roll overlay type. An existing 5.0 Roll layer is converted automatically when the world loads; you don't need a console snippet for that upgrade.

## Upgrading directly from 4.x

The old flat `rollOverlay…` settings are not read by the new overlay editor. Recreate the overlay in the [Overlay Editor](./overlay-editor.md) using [animation tracks](./overlay-animations.md), or use the migration helper below with your saved values.

## Rebuild a roll overlay with the API

Run this in your browser console as a GM with the world open on OBS Utils 5.1 or newer. Replace the example image paths and timing values with your saved V4 configuration. Times are in milliseconds; leave an image path empty when you don't use one.

```js
(async () => {
  const api = game.modules.get('obs-utils')?.api;
  if (!api?.buildLegacyRollOverlayCanvas) {
    return ui.notifications.warn('Enable OBS Utils 5.1 or newer first.');
  }

  const overlay = api.buildLegacyRollOverlayCanvas({
    preRollEnabled: false,
    preRollDelay: 0,
    preRollFadeIn: 0,
    preRollStay: 0,
    preRollFadeOut: 0,
    preRollImage: '',
    rollFadeIn: 200,
    rollStay: 5000,
    rollFadeOut: 200,
    rollBackground: '',
    rollForeground: '',
    postRollEnabled: false,
    postRollFadeIn: 0,
    postRollStay: 0,
    postRollFadeOut: 0,
    postRollImage: '',
  });
  overlay.name = 'Migrated Roll Overlay';

  const overlays = [...game.settings.get('obs-utils', 'streamOverlays')];
  if (overlays.some(item => item.name === overlay.name)) {
    return ui.notifications.warn('Migrated Roll Overlay already exists.');
  }
  overlays.push(overlay);
  await game.settings.set('obs-utils', 'streamOverlays', overlays);
  ui.notifications.info('Roll overlay added. Refresh to load it.');
})();
```

The helper creates a canvas overlay with separate pre-roll, roll and post-roll tracks, driven by `core.onPlayerRoll`. It preserves those phases instead of collapsing them into one visibility window. After refreshing, edit the result in the Overlay Editor and test it with a public roll.

The snippet adds one overlay. It does not recover unregistered settings or delete the old V4 configuration. If you don't want the old roll overlay, you can leave it behind without running anything.
