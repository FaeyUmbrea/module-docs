---
title: "Launch from regions and doors"
---

A splash can open directly, from a scene region, or when someone interacts with a door. This is useful for scene introductions, signs, or a locked door that needs a puzzle solved.

Set up the splash first, then configure its launch trigger. Test it with the intended player permissions as well as your GM view.

For a door puzzle, keep the locked and solved screens in separate states. A successful answer can change state, close the splash, or run a macro. [Script helpers](../../dev/scripting/) also let the splash unlock the door that launched it.

If a player sees an empty splash, check their access to its journal page and whether the objects are placed in the initial state. For a shared puzzle, check that the splash uses **Synced** mode and a GM is connected.
