---
title: "Assign actions and connect values"
---

An action describes what happens when someone uses an object or a state loads. First choose the event, then the action and its fields. Giving a button a label changes what it says; it does not assign its behaviour.

## Give a button an action

1. Select the button on the canvas or in the Objects list.
2. Open **Behaviour** and find **On click**.
3. Choose the action. Fill in the fields that appear below it.
4. Resolve any connection messages, then open Preview and click the button.
5. Check the visible result and **Current values** or **States** in the test controls. Restart and check the initial condition too.

Hotspots also use **On click**. A drop zone uses **On drop** when a compatible piece is dropped into it. For automatic actions when a state loads, select the state and use its **On enter** action list.

## Choose the action you need

| Action | What it does | What to fill in |
| --- | --- | --- |
| **Set value** | Stores a value for other objects or conditions to read | **Value name** and **Value**; an empty Value is allowed |
| **Increment value** | Adds a step to a numeric value | Value name, Step, optional Min/Max and Wrap |
| **Change state** | Loads and/or unloads named states when its conditions match | Load states, Unload states and optional conditions |
| **Vote** | Records this user's current choice in a shared Splash | Vote option id; use a distinct id for each choice |
| **Close splash** | Closes this playback; the GM's current global overlay closes for everyone | No additional fields |
| **Run macro** | Executes a selected world macro under that user's permissions | Pick a macro; available under advanced actions |
| **Script (inline macro)** | Runs custom script logic for this object or state | Script source; available under advanced actions |

**Show advanced actions** reveals Macro and Script. You do not need either for a basic counter, a conditional reveal or a vote. A player dismissing a global Splash closes only their view. Preview's Close ends the test playback while leaving Restart and Exit available.

## Make a counter

1. Add a text object and enter `Attempts: {attempts}` as its text.
2. Add a button labelled Try. Under **Behaviour → On click**, choose **Increment value**.
3. Set **Value name** to `attempts`, **Step** to `1` and **Min** to `0`. Leave Max empty for an unbounded counter.
4. Preview and click Try twice. The text should show `Attempts: 2`.
5. Add a Reset button using **Set value**, Value name `attempts`, Value `0`.

A missing numeric value starts from zero when incremented. Text keeps an unresolved `{attempts}` token until a value exists; use a state's **On enter → Set value** action with `0` if you want the initial display to read zero. Avoid resetting it on every visit to a state unless that is intentional.

For a dial, set Min `0`, Max `9` and enable **Wrap min↔max (tumbler digit)**. Stepping above 9 returns to 0; a negative step can turn it backwards. Without Wrap, the limits clamp the result.

## Reveal only after an answer

1. Add a button using **Set value**, Value name `answer`, Value `yes`.
2. Add a Reveal button using **Change state**. Load Revealed and unload Initial State.
3. Under **Only run when these values match**, add the value `answer` and expected value `yes`.
4. Preview: Reveal should do nothing before the first button is used. After setting the answer, Reveal should load the destination.

All listed conditions must match. Names and expected text must match the values you store. Value fields suggest existing names so you can reuse them instead of retyping a different spelling.

## Let players vote

1. In the **Splash** inspector, set **Mode** to **Synced (shared state)** and choose who can see **Vote tallies**. Keep a GM connected.
2. Give each choice button a **Vote** action with a different **Vote option id**, such as `castle` and `forest`.
3. With tallies visible to all, a text object can show `Castle: {vote:castle}` and `Forest: {vote:forest}`.
4. Test with separate users. Each user has one current choice; voting again replaces their choice rather than adding another voter.

GM-only tallies are not published as shared text values. The current voter ledger lives in the GM session; do not treat it as a persistent ballot history across a GM reload.

## When an action seems to do nothing

- Check you edited **Behaviour**, not only the button's Appearance label.
- Check the object belongs to a loaded state.
- For Change state, check both its conditions and its load/unload choices.
- For shared values or votes, check Synced mode and a connected active GM.
- For macros, check the testing user's permission to execute that macro.
- Read the connection message: it identifies missing built-in fields and references to deleted states. An action added by another module may need that module's own instructions.
