---
id: layers-and-modes
title: Layers & Modes
sidebar_label: Layers & Modes
---

# Layers & Modes

Every splash has two independent settings that decide how it reaches the table: its **layer** (how it presents on screen) and its **mode** (whether each client runs its own copy or the whole table shares one). Both live on the **Splash** tab in the editor. See [The Splash Editor](./editor.md) for where that tab sits.

## Layers

The **Kind / Layer** dropdown picks one of four presentations. The first three are fullscreen overlays. The fourth is a window.

| Layer | What it covers | What stays usable |
|---|---|---|
| **Scene** | An overlay over the canvas. | The sidebar, hotbar, scene navigation, and scene controls stay usable. |
| **HUD** | Like Scene, but also hides the scene navigation and scene control bars. | Sidebar and hotbar stay usable. The map underneath stays masked. |
| **Full** | Covers the whole interface. | Nothing but the GM live-controls chip (see below). |
| **Handout** | A framed window sized to the splash. | Everything outside the window. Players can close it themselves. |

### Scene and HUD

Scene and HUD overlays sit *below* Foundry's UI chrome. The overlay renders one z-index step under `--z-index-app`, so the sidebar, hotbar, and navigation stay clickable while the splash is up.

HUD adds one thing on top of Scene. While a HUD splash is live, Foundry's scene navigation and scene control bars are hidden. That keeps a player from reading the name of the scene you are about to cut to, or spotting the map through a gap. The bars come back the moment the splash closes, and while the GM minimizes the splash from the live-controls chip.

### Full

Full covers the entire interface. The overlay renders just under `--z-index-notification`, above the rest of Foundry. The only thing that stays above it is the GM live-controls chip.

That chip is the GM's handle on a live fullscreen splash. It shows whether the splash is **Live** or **Hidden**, the splash's name, an eye toggle to minimize or show it again, and a force-close button that shuts the splash for everyone. Players never see the chip. It only renders for the GM, and it sits above the Full overlay so you can always reach it.

### Handout

Handout is the one windowed layer. Instead of an overlay, the splash opens as a normal framed Foundry window that each player can close on their own. Opening the same handout twice just brings the existing window to the front.

When you pick **Handout**, the editor reveals **Width** and **Height** fields (minimum 100, defaulting to 800 by 600). Those dimensions set the window's opening size, stored on the splash as its handout size. The window is not resizable: the renderer draws objects at their authored coordinates, so a resized window would only clip the layout rather than scale it. Size the splash in the editor and the window opens to match.

## Where a splash appears

Two settings on the **Splash** tab control which scenes surface a fullscreen splash in the launcher.

- **Global** — a checkbox. When set, the splash shows up in the launcher's Global tab no matter which scene is active.
- **Pinned Scenes** — a multi-select of scenes. The splash appears in the launcher's Pinned tab on each scene you list here. Scene ids that no longer exist are ignored.

Neither setting launches anything on its own. They decide where the splash is offered for launching from the launcher, alongside the **Pin to scene** action covered in [Getting Started](./getting-started.md).

## Modes

The **Mode** dropdown is separate from the layer and decides who runs the splash's state.

| Mode | Behavior |
|---|---|
| **Local** | Each client runs its own copy. Clicks, counters, and state changes stay on that client. |
| **Synced** | One shared state, executed on the GM client. Players drive it through the GM, and everyone sees the same thing. |

Local is the default and is right for anything per-player: a puzzle each player solves on their own, a screen that reacts only to the viewer. Synced is for anything table-wide: a shared combination lock, a vote, a story screen the GM steers for the room.

Synced mode has its own settings and execution model, including how votes are tallied. See [Synced Mode](./synced-mode.md) for the full picture, and [Actions & Interactivity](./actions.md) for the buttons and values that drive a splash in either mode.
