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

Reading settings programmatically:

```javascript
game.settings.get('obs-utils', 'streamOverlays');     // OverlayData[]
game.settings.get('obs-utils', 'overlayActors');      // string[] of actor IDs
game.settings.get('obs-utils', 'globalOverlayCSS');   // string
game.settings.get('obs-utils', 'actorOverlayCSS');    // Record<actorId, css>
game.settings.get('obs-utils', 'activeGMUserId');     // string (current active GM)
```

For reactive consumers inside obs-utils Svelte components, prefer `settings.getStore(key)` / `settings.getReadableStore(key)` — both expose Svelte stores that mirror the setting and propagate updates from socket-driven changes.
