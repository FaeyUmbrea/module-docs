---
title: "Buttons, values, and puzzles"
---

An object can do something when a player clicks it. Choose its action in the inspector. States also have actions for entering and leaving them.

## Choose an action

| Action | Use it for |
| --- | --- |
| Set Value | Store an answer, a choice, or a piece of puzzle progress. |
| Increment Value | Move a counter or turn a combination-lock dial. |
| Change State | Reveal another screen or move to the next stage. |
| Vote | Let each player choose an option in a shared splash. |
| Run Macro | Run a macro from your world. |
| Close | Close the splash. |

Script actions are available for more involved behaviour. The [developer guide](../../dev/scripting/) covers those.

## Display a value

Text can show a named value using `{key}`. A counter stored as `attempts` can appear in text as `Attempts: {attempts}`. The displayed text updates when the value changes.

## Make a simple combination lock

1. Create values `d0`, `d1`, and `d2`, starting at `0`.
2. Add three text objects showing `{d0}`, `{d1}`, and `{d2}`.
3. Give each digit an **Increment Value** button. Use step `1`, minimum `0`, maximum `9`, and wrapping.
4. Make `locked` and `unlocked` states.
5. Add a check button with **Change State**. Load `unlocked`, unload `locked`, and add conditions for the three correct digits.

The check button only changes state when every condition matches. Wrong combination? The player stays on the locked screen and can keep trying.

You can also start from the supplied tumbler-lock preset instead of building it from scratch.
