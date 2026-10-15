---
title: "Attach a Splash to a scene, door or region"
---

A scene pin gives you a convenient launch shortcut. A trigger opens a Splash in response to something happening on the scene. Set up the handout first, then choose the connection you need.

| You want to… | Use |
| --- | --- |
| Keep an introduction ready for a particular scene | **Pinned scenes** or **Pin to current scene** |
| Keep a Splash available across scenes | **Global (scene-control global tab)** |
| Open a puzzle when someone clicks a locked door | **Player clicks a locked door** trigger |
| Open a handout when a token enters an area | **Token enters a region** trigger |
| Make artwork inside the Splash clickable | A **Hotspot** object with an **On click** action |

Pins and the Global list are shortcuts: neither automatically launches a Splash when you activate a scene. The built-in scene triggers are doors and regions; there is no general “attach to any token or tile” click binding.

## Keep a scene introduction ready

1. Open the scene you want to prepare.
2. Open **Splash Manager**, find your fullscreen Splash and open its **More** menu.
3. Choose **Pin to current scene**. To choose several scenes, edit the Splash, open the **Splash** inspector and use **Pinned scenes**.
4. Open **Splashes** in the scene controls. Find the Splash in the **Pinned** list and launch it when you are ready.
5. To check it privately, use its context menu's **Preview (just me)** action. The GM's normal launch shows it to everyone.

**Expected result:** the shortcut is available on the pinned scene. Switching scenes does not play it for you. A fullscreen Splash with a door or region binding in the scene also appears in its scene launcher.

For a reusable introduction, select **Global (scene-control global tab)** in the Splash inspector, or **Set global** in the manager's More menu. This controls where its shortcut appears; it does not make every local opening a table-wide launch.

## Open a puzzle from a locked door

1. On the scene, create a door wall and set the door to **Locked** in Foundry.
2. Find the Splash in the manager or its journal page and open **Triggers**.
3. Choose **Player clicks a locked door**. In **Bind door trigger**, select the door from the current scene.
4. Confirm that the binding appears in the Triggers list. Bound doors also have a Splash indicator for the GM.
5. Test by clicking the locked door control as the intended player.

**Expected result:** that client's Splash opens. An ordinary unlocked door click does not fire this trigger. The door's normal locked feedback can still play.

A **Close splash** action dismisses playback; it does not itself unlock the door. The supplied configurable tumbler prefab includes the unlocking behaviour. For custom logic, see the [inline script helpers](../../dev/scripting/).

To disconnect the door, remove its binding in **Triggers**. This removes the Splash connection, not the door wall.

## Open a handout when a token enters a region

1. Draw and name a Scene Region with Foundry's region tools.
2. Open the handout's **Triggers** window while viewing that scene.
3. Choose **Token enters a region**, then select the named region.
4. Move a token controlled by the intended player from outside the region into it.

**Expected result:** the client moving the token opens the Splash. The GM and other players do not each open a copy merely because they received the region event. Entering again can trigger it again; this is not a one-use encounter flag.

For a window that leaves the map available, choose **Handout (windowed)** in **Kind / layer**. For shared puzzle progress, choose **Synced (shared state)** under **Mode**. These choices are separate from the trigger.

## If nothing opens

- Door: check that it is a door wall, is locked and is the door selected in the binding.
- Region: start outside it and cross its boundary with a token the testing player can control.
- Scene: the binding picker lists objects in the scene you are currently viewing. Create the region or door first.
- Access: binding grants Observer access to the bound Splash page while preserving its parent and sibling permissions. An explicit restriction for a player may still prevent access; inspect the page's ownership.
- Empty playback: check [which states are loaded on open and which objects belong to them](../states/).
