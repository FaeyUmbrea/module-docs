---
id: triggers
title: Triggers
sidebar_label: Triggers
---

# Triggers

A trigger launches a splash from something that happens in the world instead of from a play button. A player clicks a locked door, or a token walks into a region, and the splash opens for that player. You bind triggers from the splash's own **Triggers** panel.

## Bind a trigger

Open a splash in the editor and find its **Triggers** panel. The panel has a dropdown of trigger types and a list of the bindings already on this splash. Pick a type to add a binding, and the delete button on each row removes one.

Splash ships two trigger types:

| Type | Fires when |
|---|---|
| **Door** | A player clicks a locked, bound door on the current scene. |
| **Region** | A token enters a bound region on the current scene. |

Both bindings are scoped to whichever scene is open when you create them, so open the scene that holds the door or region before you add the trigger.

Binding a trigger also raises the splash's ownership. A trigger-launched splash needs read access on its page, or Foundry hands the player a blank shell, so adding a binding sets the page (and its parent journal) to **Observer** for everyone. Existing levels only rise, so a hand-tuned higher permission is left alone. Because the journal's default ownership rises too, keep trigger-launched splashes in their own journal if their sibling pages must stay hidden.

## Door trigger

Adding a door binding prompts you to pick one of the doors on the current scene. The splash is flagged onto that door's wall.

After that, clicking the door while it is **locked** launches the splash for the player who clicked. The door's normal behavior still runs, so the usual locked-door sound plays as it always would. An unlocked door does nothing special. The trigger only fires on the locked state.

As GM you can see which doors are bound. Splash draws a small orange badge on the door control of every splash-bound wall on the canvas. Players do not see the badge.

Door triggers depend on [lib-wrapper](https://github.com/ruipin/fvtt-lib-wrapper). Without it, the door badge and the click-to-launch behavior are both disabled.

## Region trigger

Adding a region binding prompts you to pick one of the regions on the current scene. Splash attaches a **Launch Splash** region behavior to it.

When a token enters that region, the splash opens locally for the player who controls the entering token. It opens only for that one client, not the whole table.

## Pinned in the launcher

A scene's bound splashes show up in the launcher's **Pinned** list for that scene even when you never pinned them. The launcher reads every trigger binding scoped to the current scene and folds those splashes into Pinned alongside the ones you pinned by hand, deduplicated. Each one carries a small bolt icon so you can tell the trigger-wired entries apart. This gives you a play button for them without leaving a door or region as the only way in. See [Getting Started](./getting-started.md) for the rest of the launcher.

## The trigger context in macros

When a trigger launches a splash, it hands the launch context to the splash's inline macros as `api.trigger`. The context carries the uuids of whatever fired the launch:

| Field | Set by | Value |
|---|---|---|
| `api.trigger.door` | Door trigger | The bound door's wall uuid. |
| `api.trigger.region` | Region trigger | The entered region's uuid. |
| `api.trigger.token` | Region trigger | The entering token's uuid. |

The context is consumed on launch, so it never leaks into a splash opened some other way.

## Unlocking the door from a solved puzzle

The door uuid in `api.trigger.door` lets a splash open the door it came from. Call `api.unlockDoor()` from an inline macro and the bound door unlocks. Called with no argument it uses `api.trigger.door`, or you can pass a specific wall uuid.

Players cannot write wall documents, so `api.unlockDoor()` routes the request to the GM over socket and the GM opens the door. Wire it onto a puzzle's success path so the door opens the moment the combination is right.

```js
// Inline macro on a "solved" action
api.unlockDoor();
api.close();
```

The bundled tumbler-lock prefab already does this. See [Presets & Prefabs](./presets.md). For the rest of the inline-macro `api`, see [Actions & Interactivity](./actions.md) and [API](./api.md).
