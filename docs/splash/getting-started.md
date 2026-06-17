---
id: getting-started
title: Getting Started
sidebar_label: Getting Started
---

# Getting Started

## Install

Use Foundry's Module Installer to add **Splash: Interactive Handouts**, then enable it in your world's Module Management. Splash depends on [lib-wrapper](https://github.com/ruipin/fvtt-lib-wrapper); install and enable that too.

## Where Splash lives

Open the **Token** scene controls and click the **Splashes** button (the images icon). That opens the launcher, a compact panel listing the fullscreen splashes pinned to the current scene and your global splashes, with a play button to show each one to the table.

The launcher's header has an **Open Splash Manager** button. The Manager is the hub where you browse, create, edit, and launch every splash and handout in the world.

## Create your first splash

In the Manager, create a new splash and pick its presentation:

| Kind | What it is |
|---|---|
| **Full** | A fullscreen overlay that covers the whole interface. |
| **Scene** | An overlay over the canvas that leaves the sidebar, hotbar, and navigation usable. |
| **HUD** | Like Scene, but it also hides the scene navigation and control bars so it can mask the map underneath. |
| **Handout** | A normal, resizable, player-closable window. |

Give it a name and the journal it should live in, then open it in the editor.

## Build it

A splash is made of **objects** (images, text, buttons, panels, gauges, hotspots, video, text inputs, and draggable pieces with drop zones) arranged across one or more **states**. The editor is a large window with an object tree on one side, the canvas in the middle, and an inspector on the other. Drag objects to position them, group them, and place them into the states you want them to appear in.

See [The Splash Editor](./editor.md) for the full tour, and [Actions & Interactivity](./actions.md) for wiring buttons to do something.

## Show it to your players

From the launcher or the Manager:

- **Launch for players** shows the splash to the whole table and keeps it running across reloads until you close it.
- **Preview (just me)** opens it locally so you can check it without anyone else seeing.
- **Pin to scene** adds a fullscreen splash to the launcher's Pinned tab for the current scene.

Handouts open as windows that each player can close on their own. Fullscreen splashes are controlled by the GM and can be force-closed for everyone from the live-controls chip at the top of the screen.

## Foundry compatibility

- **Minimum**: 13.344
- **Maximum**: 14
