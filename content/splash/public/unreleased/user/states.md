---
title: "Build a reveal with states"
---

A **state** names a set of object placements: which objects appear, where they sit and how large they are. For a chest handout, **Closed** can show its lid and an Open button; **Open** can show the contents and a Close button.

States can be loaded together. Loading Open does not automatically unload Closed. A **Change state** action explicitly chooses both sides of that change.

## Build a closed and open chest

1. Create a handout and start from scratch. Keep **Initial State** for your closed chest, or select it and change its **State label** to **Closed**.
2. Leave **Loaded on open (initial state)** enabled for Closed.
3. Add the closed-chest image and an Open button. Objects you add are placed in the currently selected state.
4. Add a second state and label it **Open**. Leave **Loaded on open** disabled for this state.
5. While Open is selected, add the contents image, a text clue and a button labelled Close.
6. Select Closed again, select its Open button and open **Behaviour → On click**. Choose **Change state**, put Open in **Load states…** and Closed in **Unload states…**.
7. Select Open, select its Close button and assign **Close splash**. This ends playback; use another Change state action instead if you want it to return to Closed.
8. Open Preview. You should see only the closed chest. Click Open: its contents replace the closed view. **Restart preview** returns to Closed.

**Expected result:** the two states describe two views of the same authored handout. Playing the reveal changes the running view, not the starting configuration saved in the editor.

## Keep something visible in both views

Select the object, choose the other state in the States panel, then use its eye control in the object list or **Place in "Open"** under **Placement**. Adjust its placement for that state if needed.

| Edit | What changes |
| --- | --- |
| Object **Appearance** or **Behaviour** | The object's content or action across its placements |
| Object **Placement** | Its position and size in the selected state |
| **State label** | The name shown in the editor and state pickers |
| **Loaded on open** | Whether playback starts with that state loaded |
| **Change state** action | Which states playback loads or unloads when the action runs |

An object placed in two loaded states is still one object, not two copies. If you need two independent images visible together, duplicate the object instead.

## Understand the editor and the running view

Selecting Open in the editor lets you arrange Open. It does not run its actions or change a player's current view. Preview's **States** list shows which states are actually loaded during the test.

More than one state can be loaded on open. This is useful for a shared background state plus a changing clue state. Keep that background loaded while loading and unloading the clue states.

## Run something when a state opens

Select the state and add an action under **On enter — actions run when this state loads**. These actions run when playback newly loads that state, including at startup if it is loaded on open. Merely selecting it in the editor does not run them.

For example, a Revealed state's On enter action can set a value named `found` to `yes`. Do not put a repeating Increment there if your intention is to count it only once across repeated visits: unloading and loading the state can run it again.

## If the result is unexpected

- Both views remain visible: the Change state action may load Open without unloading Closed.
- Blank opening: no suitable state may be loaded on open, or the objects are not placed in it.
- The clue appears immediately: Open may also be loaded on open.
- A renamed state still works: state labels are for reading; actions retain their underlying references.
- A deleted state breaks a button: use the connection message to choose a replacement target in the action.

For a reveal that requires an answer first, continue with [actions and conditions](../actions/). For appearing and disappearing effects, use [animation transitions](../transitions/).
