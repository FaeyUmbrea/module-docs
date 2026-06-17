---
id: api
title: API
sidebar_label: API
---

# API

Splash exposes an API for module and macro authors. Reach it at:

```js
const splash = game.modules.get('splash').api;
```

The API is assigned during Foundry's `init` hook, and the `splash.init` hook fires immediately after. Register custom types from a listener on `splash.init` so they exist before any splash is built.

```js
Hooks.once('splash.init', () => {
  const api = game.modules.get('splash').api;
  // register your sprites, actions, effects, animations, triggers here
});
```

Every first-party sprite, action, effect, animation, and trigger registers through this same surface, so the registration shape below is exactly what the built-ins use.

## Registering types

Each register call takes a `type` string (the discriminator stored on the object's data), a human `name` shown in the editor's pickers, and a builder.

### Sprites

```js
api.registerSprite('my-sprite', 'My Sprite', (sprite, state, context) => {
  // return a PIXI.DisplayObject (or a Promise of one)
});
```

| Argument | What it is |
|---|---|
| `sprite` | The sprite's data, including your custom fields. |
| `state` | The state the sprite is being instantiated into. |
| `context` | Per-sprite wiring back into the runtime. `context.onAction(action)` runs an action through the owning splash instance; call it from a click handler to keep behavior instance-scoped. |

### Actions

```js
api.registerAction('my-action', 'My Action', (action) => {
  // run a side effect
});
```

The processor receives the action's data. Actions registered this way run through the runtime's external executor, which is how the built-in `macro` action fires a Foundry macro. The value and state actions (`set-value`, `increment-value`, `change-state`, `close`) are handled inside each running splash and are registered only so the editor can list them.

### Effects

```js
api.registerEffect('my-effect', 'My Effect', (app, effect) => {
  // return a PIXI.Filter (or a Promise of one)
});
```

The builder gets the PIXI `Application` and the effect's data, and returns a filter applied to the sprite.

### Animations

```js
api.registerAnimation('my-anim', 'My Animation', (animation, sprite, app) => {
  // mutate sprite.filters or tween; runs for the animation's duration
});
```

The builder gets the animation's data, the target `PIXI.DisplayObject`, and the PIXI `Application`. Use `animation.duration` and `animation.delay` to schedule cleanup, the way the built-in `dissolve` and `glitch` animations do.

### Triggers

A trigger is a source in the world (a region, a door) wired to launch a splash. Register one with a `type`, a `label`, and the rest of the trigger definition.

```js
api.registerTrigger('my-trigger', 'My Trigger', {
  icon: 'fa-solid fa-bolt',
  createBinding: async (splashUuid) => {
    // interactively wire a new binding; resolve true on success
    return true;
  },
  listBindings: () => [
    // every live binding of this type, world-wide
  ],
  removeBinding: async (binding) => {
    // tear the binding down
  },
});
```

A `TriggerBinding` carries an `id` (stable, used for removal), `type`, `splashUuid`, a human `summary` for the triggers list, and an optional `sceneId`. See [Triggers](./triggers.md) for how bindings surface in the UI.

## Inspecting the registry

| Getter | Returns |
|---|---|
| `api.registeredAnimations` | `{ type, name }[]` |
| `api.registeredEffects` | `{ type, name }[]` |
| `api.registeredActions` | `{ type, name }[]` |
| `api.registeredTriggers` | the registered `TriggerDefinition[]` |
| `api.getTrigger(type)` | one trigger definition, or `undefined` |
| `api.bindingsForSplash(uuid)` | every live binding pointing at that splash |

## Launching splashes

These methods take a splash journal page UUID and respect view and trigger permissions.

| Method | What it does |
|---|---|
| `api.launch(uuid, opts)` | Open the splash using its stored presentation. A `handout` opens a windowed app; `scene`, `hud`, and `full` open a fullscreen overlay. |
| `api.show(uuid, opts)` | Show the splash at a given `layer`. |
| `api.openHandout(uuid)` | Open the handout window directly. |
| `api.close(opts)` | Close the active splash locally. |

`launch` and `show` accept `{ global, targetUser }`. `global` is GM-only and shows the splash table-wide, persisting until closed. `targetUser` shows it transiently to one player. With neither, the splash opens locally for you. `show` also takes `layer` (`full` by default). `close` accepts `{ global }`, GM-only, to kill the splash for the whole table.

```js
await api.launch('JournalEntry.abc.JournalEntryPage.def', { global: true });
```

See [Layers & Modes](./layers-and-modes.md) for what each presentation looks like, and [Synced Mode](./synced-mode.md) for how global splashes share state.

## Inline-macro scripts

A button's `script` action runs a snippet of JavaScript inside the running splash. The source executes as an async function body with three arguments in scope.

| Name | What it is |
|---|---|
| `scope` | The firing sprite's node in the splash's sprite tree. The node carries `id`, `name`, `type`, `parent`, `children`, and `child.get(name)` to find one of its children by name (reach a sibling through `scope.parent.child.get(name)`). `scope.get(property)` and `scope.set(property, value)` read and write a sprite property, and `scope.text` is a live accessor for its text. Writes are ephemeral synced overrides, not saved to the document. |
| `context` | The firing sprite's data bag (`scope.context`), a plain object you can stash values on. |
| `api` | A small surface for driving the splash from the script (below). |

The script `api` is scoped to this splash instance, not the module-level API:

| Member | What it does |
|---|---|
| `api.changeState(load, unload)` | Load and unload states by id, the same as a change-state action. |
| `api.setValue(key, value)` | Set a named runtime value. |
| `api.close()` | Request the splash close. |
| `api.unlockDoor(uuid)` | Unlock a door. Defaults to the door that triggered the splash; routed through the GM when a player can't write walls. |
| `api.trigger` | What launched this splash, e.g. `{ door }` for a door trigger. |

```js
// Reveal a hidden state when the dialed letters spell the word.
if (scope.child.get('lock').text === 'OPEN') {
  api.changeState(['vault-open'], ['vault-locked']);
  api.unlockDoor();
}
```

`scope.set` and `scope.text` write synced overrides, so a dialed letter or revealed value stays consistent across the table in [synced mode](./synced-mode.md). See [Actions & Interactivity](./actions.md) for wiring buttons to scripts.
