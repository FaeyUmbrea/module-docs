---
id: triggers
title: Triggers
sidebar_label: Triggers
---

# Triggers

A **trigger** is a named event that the animation system can react to. When a trigger fires, the playback engine looks up any `TrackTransition` entries that reference that trigger key and, based on where the playhead is in the current track, decides whether to jump to another track or do nothing. This is how you turn a static ambient overlay into something that reacts to a crit, a chat message, or any custom game event.

Triggers were added in 5.1 and replace the legacy roll-overlay layer type.

## Concepts

- A trigger is identified by an **event key** (e.g. `core.onPlayerRoll`).
- Each trigger declares a **payload schema** — what data it carries when it fires.
- Trigger-driven behavior is configured in the **Transitions drawer** in the Animation workspace. There is no separate trigger section on the overlay's settings tab.
- How the overlay reacts when a trigger fires depends on the current playhead position and which `TransitionZone` covers it — see [Re-entry and zones](#re-entry-and-zones) below.

## Built-in trigger events

| Event key | Fires when | Notable payload fields |
|-----------|------------|------------------------|
| `core.onPlayerRoll` | A public chat roll is posted | `actor`, `total`, `formula`, `isCritical`, `isFumble` |
| `core.onChatMessage` | Any public chat message is posted | `content`, `speakerAlias` |

Note: `core.onPlayerRoll` carries a `roll` field (the Roll object) that has `filter: false` — it appears in component data paths via `trigger.roll` but is **not** available as a condition filter in the editor. Conditions for this trigger can only filter on `total`, `formula`, `isCritical`, `isFumble`, and `actor`.

System companion modules add their own event keys (`dnd5e.onCrit`, `pf2e.onHeroPoint`, `coc.onSanLoss`, etc.). See each system module's docs for the full list.

## Configuring triggers on an overlay

Open the overlay in the Stream Composer and switch to the **Animation** workspace tab. If the overlay has no animation set up yet, click **Set up animation** to seed a default idle track.

From there, open the **Transitions drawer** (the badge on the TrackBar that shows the transition count). Add a transition entry, pick the trigger event, and configure the zones — see [Overlay Animations: Transitions](./overlay-animations.md#transitions) for the full data model.

A typical pattern for a roll-banner overlay:

1. An idle track (`static`, `durationMs: 0`) — the overlay rests here when nothing is happening.
2. An active track (`transition-on-end` back to idle, `durationMs: 2000`) — plays for 2 s then automatically returns to idle.
3. A transition on the idle track: when `core.onPlayerRoll` fires (zone covering the whole idle track), jump to the active track at `t = 0`.

## Reading payload data from components

A component's data path may reference the trigger payload using the `trigger.` prefix:

- `trigger.total` — the roll total
- `trigger.actor.name` — the rolling actor's name
- `trigger.formula` — the roll formula
- `trigger.isCritical` — boolean flag

While no trigger has fired, the path resolves to an empty string. When a trigger fires, the payload becomes available and components re-resolve their data.

If a path starts with `trigger.` but the field doesn't exist in the registered payload schema, it falls back to the empty string — overlays degrade gracefully if a payload field is missing.

## Conditions semantics

Conditions are simple equality filters. The condition `{ isCritical: true }` matches an event whose payload has `isCritical === true`. Empty / null / undefined conditions are ignored (treated as wildcards).

Fields with `filter: false` in the payload schema do not appear in the editor's condition inputs. For `core.onPlayerRoll`, this means you cannot filter conditions on `roll` directly — use `total`, `isCritical`, or `isFumble` instead.

## Re-entry and zones

When a trigger fires, the engine checks the current track's `TrackTransition` entries for that trigger key. It then scans the zones in order and picks the first zone whose `[startT, endT)` window contains the current playhead position.

- If the matching destination is `goto(toTrackId, toTime)`, the engine jumps to that track at that time.
- If the destination is `ignore`, the trigger is discarded and playback continues unchanged.
- If no zone matches (and the track is static with `durationMs: 0`), the engine falls back to the first zone.

This means you can give a trigger different behavior depending on where the animation is:

- While on the idle track → jump to the active track and play it.
- While the active track is still playing (if you added a transition there too) → ignore the re-fire, or restart, or jump to a different track — whatever your zones say.

## `tileBy: 'players'` and per-user routing

Triggered overlays typically use `tileBy: 'players'` (configured on the Settings workspace tab) so the renderer creates one tile per non-GM user. When a trigger payload carries a `user` field, the engine routes the payload to the tile whose `user.id` matches — so each player sees their own overlay react to their own roll, not everyone else's.

## Registering a new trigger event (module authors)

System modules expose new event types via:

```js
game.modules.get('obs-utils').api.registerOverlayTrigger({
    key: 'my-system.onSomeEvent',
    name: 'my-system.triggers.onSomeEvent.name',  // i18n key
    icon: 'fas fa-bolt',
    payloadSchema: [
        { key: 'actor', type: 'Actor', label: 'my-system.triggers.onSomeEvent.fields.actor', display: true, filter: true },
        { key: 'magnitude', type: 'number', label: 'my-system.triggers.onSomeEvent.fields.magnitude', display: true, filter: true },
    ],
});
```

Then, when the in-system condition fires, call:

```js
game.modules.get('obs-utils').api.fireOverlayTrigger('my-system.onSomeEvent', {
    actor: someActor,
    magnitude: 12,
});
```

Fields with `display: true` are reachable via `trigger.<key>` from components. Fields with `filter: true` show up in the editor's Conditions inputs. The two flags are independent — a field can be one, both, or neither. Setting `filter: false` keeps the field accessible to components but hides it from the condition UI.
