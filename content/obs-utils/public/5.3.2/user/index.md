---
title: "OBS Utils"
---

OBS Utils connects your Foundry game to OBS Studio. It gives the stream its own view, lets you build overlays from actor values, and can switch OBS scenes in response to Foundry events.

Start with [Getting started](./getting-started/) to connect your browser source. Then open the [Overlay Editor](./stream-composer/) to build an overlay.

## Fixes in 5.3.2

Roll overlays now match the rolling player and retain roll data on `/stream`. Event overlays keep their own event data when another player or actor triggers an event. Data pickers also handle duplicate group labels and root actor fields such as `name` and `img`.

## Languages in 5.3.2

This release temporarily includes English and German only. Other interface languages fall back to English.

## What you can do

- Track a GM or a player with the stream camera.
- Put names, portraits, health bars, and other actor values on the stream.
- Use Foundry events to drive overlay triggers and OBS actions.
- Import and export overlay bundles.

Writing an integration? Start with the [Developer docs](../dev/).

## Guides

- [Camera modes](./camera-modes/)
- [Manual mode](./manual-mode/)
- [Scene presets](./scene-presets/)
- [OBS Remote](./obs-remote/)
- [Overlay animations](./overlay-animations/)

## More overlay and camera guides

- [Overlay Editor](./stream-composer/) — select actors, add components and arrange the layout.
- [Custom CSS](./custom-css/) — style components, overlays and actor rows.
- [Overlay triggers](./triggers/) — use roll, chat and system events.
- [Bundles](./bundles/) — import, export and share overlays with their assets.
- [Multi-GM handover](./multi-gm/) — choose whose GM camera the stream follows.
- [Migrate from older overlay formats](./migrate-from-v4/) — keep or rebuild a V4/5.0 roll overlay.
