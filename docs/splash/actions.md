---
id: actions
title: Actions & Interactivity
sidebar_label: Actions & Interactivity
---

# Actions & Interactivity

An action is what happens when a button is clicked. You wire one onto a button's **On Click** field in the inspector, and you can attach the same kinds of action to a state's **On Enter** so it runs the moment that state finishes loading. Actions read and write a splash's [named values](#named-values), change which [states](./layers-and-modes.md) are loaded, run macros, or run inline script. Strung together across states, they make puzzles, combination locks, votes, and branching screens.

## Wiring a button

Select a button in the editor and open its inspector. The **On Click** action picker is a single dropdown of action types. Pick a type and its fields appear below the picker. The same editor is used for a state's **On Enter** actions, which fire once after the state's sprites are in place.

A button carries exactly one action. To do several things on one click, use a `change-state` action that loads a state whose **On Enter** runs the rest, or use a `script` action.

## Action types

| Type | What it does |
|---|---|
| **Change State** | Loads and unloads states. Optionally gated by [conditions](#conditions-as-a-value-gate). |
| **Set Value** | Writes a fixed string to a named value. |
| **Increment Value** | Adds a step to a numeric value, with optional `min`, `max`, and `wrap`. |
| **Vote** | Casts the clicking player's vote for an option. One vote per player. |
| **Run Macro** | Runs a world Macro you pick. |
| **Script** | Runs the inline source you type into the action. |
| **Close** | Closes the splash. |

### Change State

Pick a set of states to **Load** and a set to **Unload**. Loading a state brings in the sprites that have an entry for it, or transitions already-rendered sprites into that state's layout. Unloading sends a sprite to a remaining loaded state if it has one, otherwise animates it out. A state change in progress ignores further `change-state` calls until it settles, so a double-click can't tangle the transition.

### Set Value

Writes `value` to the named key. Values are always stored as strings. Use this to record a choice, set a flag a condition checks for, or feed a `{value}` token in displayed text.

### Increment Value

Adds `step` (default `1`, negative to count down) to the current numeric value of `key`. `min` and `max` clamp the result. When **Wrap** is on and both bounds are set, going past `max` jumps to `min` and going below `min` jumps to `max`. That wrap is what makes a tumbler digit roll `0 1 2 ... 9 0` instead of stopping at `9`. With **Wrap** off, the value clamps at the bound.

### Vote

Casts a vote for `optionId` on behalf of the clicking player. Each player gets one vote; clicking a different option switches it. Tallies surface as runtime values keyed `vote:<optionId>`, so a text sprite can show a live count with `{vote:castle}`. Whether players see the tally or only the GM does is set per splash by the **Vote Visibility** option. Votes are meaningful in [synced mode](./synced-mode.md), where every player drives one shared runtime.

### Run Macro

Runs a Macro from the world. Macro execution is handed to Foundry, so the macro runs with its normal scope and permissions, not inside the splash runtime.

### Close

Requests that the splash close. For a handout that's the window closing; for a fullscreen splash it's the GM-controlled teardown.

## Named values

A splash carries a bag of **named values**: string entries you define on the splash and read or write from actions. Counters, vote tallies, and conditions all key off them. **Set Value** and **Increment Value** write them, **Increment Value** reads one back as a number, and conditions compare them.

### Text interpolation

Any text sprite can embed a value with a `{key}` token. The token is replaced with the value's current string when the sprite renders and whenever values change. Keys may be namespaced, so `{vote:castle}` and `{combo.0}` both work. An unknown key is left as-is, so a literal `{foo}` survives when no value named `foo` exists.

## Conditions as a value gate

A **Change State** action can carry **conditions**, a set of `key = expected` pairs. The transition only fires when every named value equals its expected string; otherwise the click does nothing. This turns a plain state change into a gate.

This is the whole trick behind a combination lock. A "check" button tries to load the **unlocked** state, but only when each dialed digit matches the secret. If the combination is wrong, nothing happens and the player keeps dialing.

In the editor, add a condition by typing a value key and pressing the **+**, then fill in the expected value beside it. Remove a row with its trash button. A condition row's expected value is compared as a string, so a digit dialed to `7` matches an expected `7`.

## Worked example: a combination lock

Three tumbler digits, a check button, and a locked door. The values `d0`, `d1`, `d2` hold the dialed digits; the secret is `4 2 7`.

1. **Three digit displays.** Each is a text sprite showing `{d0}`, `{d1}`, `{d2}`. Give the splash starting values of `0` for each.
2. **Three "up" buttons**, one per digit. Each runs **Increment Value** on its key with `step 1`, `min 0`, `max 9`, **Wrap on** so the digit rolls over. Add matching "down" buttons with `step -1` if you want both directions.
3. **A check button.** It runs **Change State**: **Load** `unlocked`, **Unload** `locked`, with conditions:

   | Key | Expected |
   |---|---|
   | `d0` | `4` |
   | `d1` | `2` |
   | `d2` | `7` |

   While any digit is wrong, the click is ignored. When all three match, the splash transitions to **unlocked**.

4. **The unlocked state's On Enter.** Attach a **Script** action that opens the door, or a **Close** action, or another **Change State** that reveals the next screen.

For the ready-made version of this, see the tumbler lock in [Presets & Prefabs](./presets.md).

## Inline-macro scripts

A **Script** action runs the source you type, as the body of an async function. Three globals are in scope:

| Global | What it is |
|---|---|
| `scope` | The node for the sprite that fired the action, inside the materialized sprite tree. |
| `context` | That sprite's free-form **context** data bag, the same as `scope.context`. |
| `api` | Helpers for driving the runtime (below). |

`scope` lets you navigate the tree relatively and read or write live properties. `scope.text` reads a text sprite's current text (interpolated) and assigning to it sets an ephemeral override, so you can write a dialed letter without touching the saved splash. `scope.get(property)` and `scope.set(property, value)` do the same for arbitrary properties, and you can reach other sprites through `scope.parent` and a parent's `child.get("Name")`.

`context` is whatever you stored in that sprite's context field in the editor. Use it to parameterize one shared script across many buttons: a letter dial's value, an answer key, a target state name.

The `api` object exposes:

| Member | What it does |
|---|---|
| `api.changeState(load?, unload?)` | Loads and unloads states, same as a **Change State** action. |
| `api.setValue(key, value)` | Writes a named value. |
| `api.close()` | Requests the splash close. |
| `api.unlockDoor(uuid?)` | Unlocks a door wall. Defaults to the door that launched the splash. |
| `api.trigger` | Data about what launched the splash, e.g. `{ door }`. |

`api.unlockDoor` and `api.trigger` pair with door [triggers](./triggers.md): a splash opened by a player clicking a locked door receives that door as `api.trigger.door`, and `api.unlockDoor()` opens it, routed through the GM when the player can't write walls themselves. A script that throws is caught and logged; it won't tear down the splash.

In [synced mode](./synced-mode.md), value and state changes are shared across the table and a player's click is forwarded to the GM, so scripts behave the same whether the GM or a player fires them.
