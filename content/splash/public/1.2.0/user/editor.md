---
title: "Build and test a handout"
---

This walkthrough uses Splash 1.2.0. The 1.1.0 editor has a different layout.

## Choose a starting point

Create a splash in **Splash Manager** and choose **Handout** if you want a window rather than a fullscreen display. Its empty editor offers two starting points:

- **Start from scratch** opens the object library. Each object has a short explanation: an image displays artwork, a hotspot makes part of it clickable, and a button gives players a labelled action.
- **Use an existing prefab** opens your reusable groups and available compendium prefabs. A configurable prefab asks for its settings before placing its objects.

You can open the object library again with **Add object** in the Objects panel.

## Edit one thing at a time

Select an object on the canvas or in the object list. Its inspector has three sections:

- **Appearance** changes its visible content and artwork. Animation, effects and reusable presets have their own expandable sections.
- **Placement** changes its position, dimensions and layer order in the current state.
- **Behaviour** connects actions and shared values. Scripts, macros and macro data remain available through the advanced controls.

For text, choose left, centre or right with **Align** in Appearance and set its width in Placement. The width gives the letters room to align; it does not stretch them.

Selecting or adding a state opens that state's settings. Give it a readable label and choose whether it should be **Loaded on open**. An object can have a different placement in each state; the eye button in the object list controls whether it belongs to the current state.

## Arrange objects

Drag objects to move them and use their handles to resize. Drag a selection box around several objects to work on them together.

The workspace toolbar provides **Duplicate**, **Group**, **Align** and **Layer** controls. Aligning one object uses the handout edges; aligning several uses their shared bounds. Duplicating a group makes an independent copy and selects it. **Undo** reverses the operation.

Double-click a group to edit individual members. Press **Escape** to leave the group.

## Share a value between objects

A **Shared value** gives related objects one piece of information to read or change. For example, an input can store an `answer`, a button can set it to `yes`, and another button can require that answer before revealing a clue.

Value-name fields suggest names already used in the handout. Choose one to reuse it, or type a new name. State pickers show your state labels, so you don't need to remember their internal identifiers.

Incomplete built-in actions explain what needs filling in. The connection summary above the workspace lists actions needing attention before testing. An empty stored value is allowed; a value-changing action still needs a name for the value it changes.

## Test a reveal

1. Keep **Initial State** loaded on open. Add a second state called **Revealed** and put a text clue in it.
2. In Initial State, add a button. In **Behaviour**, choose **Set value**, name the value `answer`, and set it to `yes`.
3. Add another button. Choose **Change state**, load **Revealed**, and unload **Initial State**. Add a condition requiring `answer` to equal `yes`.
4. Open **Preview**. Try the reveal button first: it should leave the initial state in place. Use the value-changing button, then try the reveal again.
5. Watch **States** and **Current values** in the test controls. **Restart preview** clears the runtime changes and opens the initial state again. **Exit preview** returns to editing.

Preview uses a local runtime and does not save the player's answers or test progress into the authored handout. Restart also remains available if a handout closes itself.

## Save and recover

The editor saves your changes as you work. Its status shows **Saving…** or **Saved**. Text fields keep their normal text undo; the workspace **Undo** and **Redo** buttons operate on the handout.

If saving fails, the editor keeps your draft and displays **Retry save**. Keep the window open and retry when the problem is resolved. You can continue editing or undoing while the draft is unsaved. Closing a rejected draft asks before discarding it; retrying saves the latest draft, including those further edits.
