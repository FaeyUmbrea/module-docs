---
title: "Getting started"
---

Link your Patreon account to your Foundry VTT account in your [Foundry profile](https://foundryvtt.com/me/). Eligible modules appear under **Subscribed Content**. Install **OBS Utils Premium**, **libCamera** (1.13.2 or newer, below 2.0), and **libWrapper**, then enable them in your world. Premium 5.4.1 supports Foundry **13.351 through 14**.

Enable Premium instead of the public OBS Utils edition. Free and Premium keep separate settings; use [Setup's edition import](../setup/#import-settings-from-the-other-edition) to carry your configuration across.

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
