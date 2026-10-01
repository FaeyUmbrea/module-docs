---
title: "Getting started"
---

Install **OBS Utils** through Foundry's module installer, then enable it in your world alongside **libWrapper**. Release 5.3.0 supports Foundry **13.344 through 14**.

## Add a browser source in OBS

Create a Browser Source in your OBS scene and point it at your Foundry server:

- `/game` shows the game board.
- `/stream` is the stream view for overlays.

Use **Interact** in OBS to log in inside the browser source. A dedicated Foundry user makes it easier to keep your own game view separate from the stream.

OBS browser sources are detected automatically. If you need to select a user manually, open the OBS Utils settings and use **Designate User as OBS Client**.

## Open the Director

Open the OBS Utils **Director** from Foundry's scene controls. Use its controls to choose how the stream camera follows the game.

Keep Foundry open in your normal browser while you work. The OBS source is the view your audience sees; the Director is where you control it.

## If the stream view looks wrong

Check that the browser source is connected as the intended Foundry user and that OBS mode is active. If you accidentally pinned your own browser into OBS mode, use the module settings to disable it.

Once the connection is working, [make your first overlay](../stream-composer/).
