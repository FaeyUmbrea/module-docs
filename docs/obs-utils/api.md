---
id: api
title: API
sidebar_label: API
---

# API

OBS Utils exposes an API for registering custom overlay types and OBS Remote event types so other modules can extend it without forking.

## Accessing the API

```javascript
const api = game.modules.get('obs-utils').api;
```

A typed reference is generated from the source — see the [auto-generated API reference](./api-reference/index.md) for the full surface. Treat anything not documented on this page as internal.

## Internationalisation

All user-facing strings passed to the API (`registerOverlayType`'s `readableName`, `registerOBSRemoteEventType`'s `name`, condition-field labels) are resolved with `game.i18n.localize()` at render time. Pass an i18n key for translatable strings, or a literal string for a single-locale module.

## Overlay types

A custom overlay type combines a Svelte renderer with a set of components and, optionally, an editor for the Stream Composer.

```javascript
import MyOverlay from './MyOverlay.svelte';
import MyOverlayEditor from './MyOverlayEditor.svelte';

Hooks.once('obs-utils.init', () => {
  const api = game.modules.get('obs-utils').api;
  const myType = new api.OverlayType(MyOverlay);
  myType.registerOverlayEditor(MyOverlayEditor);
  myType.perActor = true; // renders once per selected actor (default)
  api.registerOverlayType('my-key', 'mymod.overlays.myType.name', myType);
});
```

The `obs-utils.init` hook fires once the API is attached but before the world is ready, so register types there to ensure they're available when the editor opens.

### Single-instance overlays

For overlays that render exactly once globally (not per-actor), register the Svelte class directly:

```javascript
api.registerUniqueOverlaySvelte5(MyGlobalOverlay);
```

The class is mounted once into the `.overlay-renderer` subtree on `/stream`, the Full Preview, and the editor.

## OBS Remote events

Custom event types appear in the OBS Remote → Events dropdown alongside the built-ins. They can declare a schema of condition fields the editor renders as inputs.

```javascript
const api = game.modules.get('obs-utils').api;

api.registerOBSRemoteEventType({
  key: 'mymod.onLowHP',
  name: 'mymod.events.lowHP.name',     // localised at render time
  icon: 'fas fa-heart-crack',
  conditionFields: [
    {
      key: 'threshold',
      label: 'mymod.events.lowHP.threshold',
      type: 'number',
      default: 5,
    },
    {
      key: 'actorName',
      label: 'mymod.events.lowHP.actorName',
      type: 'string',
      default: '',
    },
  ],
  matcher: (conditions, context) => {
    // Called for each configured instance of this event type when the event
    // fires. Return true to run the instance's actions, false to skip.
    if (conditions.actorName && conditions.actorName !== context.actor?.name) return false;
    return context.hp <= conditions.threshold;
  },
});
```

To fire the event, call:

```javascript
api.triggerOBSRemoteEvent('mymod.onLowHP', { actor, hp });
```

Only the OBS client actually applies the actions — `triggerOBSRemoteEvent` is a no-op on non-OBS pages. Pass any context object you need; the matcher receives it as the second argument.

### Condition field types

| `type` | Editor input |
|---|---|
| `'string'` | `<input type="text">` |
| `'number'` | `<input type="number">` |
| `'boolean'` | `<input type="checkbox">` |

### Multiple instances

Event types with at least one `conditionFields` entry let users configure multiple instances (each with its own conditions + actions). No-condition events collapse to a single implicit instance — the Events tab just shows the action list.

## Settings and stores

The list below covers selected settings that are useful to read from third-party modules. It is not exhaustive.

```javascript
game.settings.get('obs-utils', 'streamOverlays');        // OverlayData[]
game.settings.get('obs-utils', 'overlayActors');         // string[] of actor IDs
game.settings.get('obs-utils', 'overlayActorsModified'); // boolean — true once the GM has manually edited the actor list
game.settings.get('obs-utils', 'globalOverlayCSS');      // string
game.settings.get('obs-utils', 'actorOverlayCSS');       // Record<actorId, css>
game.settings.get('obs-utils', 'activeGMUserId');        // string (current active GM)
game.settings.get('obs-utils', 'cameraTrackingMode');    // 'raw' | 'smooth' | 'dragRelease'
game.settings.get('obs-utils', 'cameraSmoothing');       // number, 0–1500 ms
game.settings.get('obs-utils', 'cameraEasing');          // string (easing function name)
```

For reactive consumers inside obs-utils Svelte components, prefer `settings.getStore(key)` / `settings.getReadableStore(key)` — both expose Svelte stores that mirror the setting and propagate updates from socket-driven changes.

## Overlay triggers

Overlay triggers are named Foundry events that animation tracks can subscribe to — they drive track transitions without tight coupling between the firing module and the overlay system.

```javascript
api.registerOverlayTrigger({
  key: 'mymod.onSpellCast',
  name: 'mymod.triggers.spellCast.name',
  icon: 'fas fa-wand-sparkles',
  payloadSchema: [
    { key: 'actor', type: 'Actor', label: 'mymod.triggers.spellCast.actor', display: true, filter: true },
    { key: 'spellName', type: 'string', label: 'mymod.triggers.spellCast.spell', display: true, filter: true },
  ],
});
```

To fire the trigger from your module:

```javascript
api.fireOverlayTrigger('mymod.onSpellCast', { actor, spellName });
```

`fireOverlayTrigger` dispatches via `Hooks.callAll('obs-utils.overlayTrigger', key, payload)` — any number of overlay renderers can react without direct coupling.

## Director tabs

Third-party modules can add tabs to the Director window:

```javascript
import MyTab from './MyTab.svelte';

api.registerDirectorTab({
  key: 'mymod.weatherTab',
  label: 'mymod.director.weather.label',
  icon: 'fas fa-cloud',
  component: MyTab,   // receives { disabled } prop
  order: 100,         // built-ins use 10/20/30; module tabs default to 100
});
```

## Director state

```javascript
const state = api.getDirectorState(); // DirectorState snapshot
```

Subscribe to changes via the `obs-utils.director.stateChanged` hook:

```javascript
Hooks.on('obs-utils.director.stateChanged', (next, prev) => {
  // next: DirectorState, prev: DirectorState | undefined
});
```

## Camera presets

```javascript
// Broadcast the preset — claims active GM, swaps tracking mode, broadcasts to all OBS clients.
api.playPreset(preset);  // void

// Local-only preview (no broadcast, no state changes). Returns a SequenceController.
const controller = api.previewPreset(preset);
controller.pause();
controller.resume();
controller.scrub(timeMs);
controller.stop();
```

## Actor selection and AV data

```javascript
// Selected actors (the array of actor IDs the overlay tiling works from).
api.getSelectedActors();                        // string[] | undefined
await api.setSelectedActors(['actorId1', ...]);

// Flat AV data (last writer wins).
api.setAVData(actorValueArray);

// Grouped AV data — group labels are i18n keys, localised at flatten time.
api.setAVDataGrouped(groups);
```

## Starter overlays

System companion modules can register a starter overlay set that replaces the generic default in the overlay editor's template menu:

```javascript
api.registerStarterOverlays(overlaysArray);  // last writer wins
```

## Migration helper

```javascript
// Build a canvas overlay that emulates the 4.x roll overlay from a legacy flat config.
// Returns OverlayData; does not touch settings.
const overlay = api.buildLegacyRollOverlayCanvas(legacyConfig);
```

## OBS client utilities

```javascript
api.isOBS();                    // boolean — true on OBS-mode pages

// Returns the OBSWebSocket client if allowWebsocketAPI is enabled, otherwise undefined.
api.getOBSWebsocketClient();
```

## OverlayType methods

An `OverlayType` instance wires together a renderer, component types, and optional editors.

```javascript
const myType = new api.OverlayType(MyOverlaySvelte);
myType.perActor = true;  // render once per selected actor (default: true)

// Register a renderable component type.
myType.registerComponent('my-key', 'mymod.components.foo.name', FooComponent);

// Register an editor for a component type (shown in the Stream Composer).
myType.registerComponentEditor('my-key', FooEditor);

// Register image-slot handlers so the bundle walker can extract and rewrite image refs.
myType.registerComponentImageSlots('my-key', {
  extract: (data) => [/* image paths from data */],
  rewrite: (data, pathMap) => /* new data string with paths replaced */,
});

// Register a custom editor UI for the overlay itself (replaces the default).
myType.registerOverlayEditor(MyOverlayEditor);

api.registerOverlayType('my-key', 'mymod.overlays.myType.name', myType);
```
