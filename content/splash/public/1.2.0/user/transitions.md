---
title: "Add entrance and exit animations"
---

Splash's animations reveal or remove objects when they enter or leave playback. They are separate from a state's position and size, and from persistent effects such as scanlines. Changing between two placements of an object does not create a keyframe tween between them.

Shader transitions require the **WebGL** renderer. Foundry's Splash renderer setting can choose HTML as a fallback; that renderer keeps the interaction but skips shader animations and effects.

## Dissolve a clue into view

Start with the [Closed/Open state tutorial](../states/). Use a clue object placed only in Open so it actually enters playback when that state loads.

1. Select Open, then select the clue.
2. In **Appearance**, expand **Animation and effects** and find **Animation in**.
3. Choose **Dissolve**. Set **Duration** to `1000` and **Delay** to `0`. These numbers are milliseconds: `1000` is one second.
4. Keep **Origins** at **Random** and start with one origin, or choose **Fixed** and click the origin bar to add a position. Drag a marker to move it; right-click one to remove it.
5. Open Preview and click the button that loads Open and unloads Closed.
6. The clue should appear through the effect. Restart and repeat to check the opening again.

For an exit effect, set **Animation out**, then unload the object's last loaded state or close the Splash normally. An object that remains in another loaded state changes to that placement instead of disappearing.

## Choose the effect

| Animation | What to expect | Useful controls |
| --- | --- | --- |
| **Dissolve** | Reveals or removes the object through a dissolve | Duration, delay and origins |
| **Glitch** | A distorted reveal/removal | Bands, intensity, tint and invert |
| **Pixelate** | A blocky reveal/removal | Block size and invert |

**Duration** controls the running time; **Delay** postpones its start. Origins are positions across the stage width, not additional keyframes. Use a small number first so you can understand the result before adding more.

## Choose where to assign it

| Location | Use it for |
| --- | --- |
| **Splash** inspector → **Splash animation in/out** | A default for objects throughout the Splash |
| Object **Appearance** → **Animation in/out** | An animation assigned to that object |
| Object **Placement** → **State animation in/out** | An animation on that object's placement in the selected state |

Start at one level. If you combine levels, entrance animations use the placement first, then the object, then the Splash default. Exit animations currently use the object first, then its placement, then the Splash default. Choosing **None** clears that assignment, allowing the next applicable default to be used; it does not disable a default set elsewhere.

## Reuse a transition

Use the folder button beside an animation heading to apply a saved animation preset. A GM can use its save button to store the current configuration as a preset. Applying a preset copies its settings into the current assignment.

## If nothing animates

- Check that Splash is using WebGL rather than HTML.
- Check **Duration** is above zero and account for any **Delay**.
- Check the object actually enters or leaves playback. If the same object stays in another loaded state, it is changing placement rather than appearing or disappearing.
- Check for an assignment at a more specific applicable level.
- Use **Restart preview** to replay startup. A globally active Splash restored after a browser reload intentionally skips its entrance animation.

For a full-screen replacement, place separate screen artwork in the outgoing and incoming states and use **Change state** to load one and unload the other. Shared artwork can stay in a background state throughout.
