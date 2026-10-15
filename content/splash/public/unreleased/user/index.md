---
title: "Splash public baseline — in development"
---

This guide covers the next public editor while it is in development. These changes haven't been released yet. For the published module, use the [Splash 1.1.0 guide](/splash/public/1.1.0/user/).

The editor helps you build an interactive handout from artwork, text and objects. Start from scratch or place an existing prefab, arrange the objects, then test the handout's states and values before showing it to players.

## Start with a workflow

- [Build and test a handout](./editor/): start from scratch or a prefab, arrange objects and recover a failed save.
- [Attach a Splash to a scene, door or region](./triggers/): choose a scene shortcut or an automatic launch trigger.
- [Build a reveal with states](./states/): control what appears on open and what changes when a player acts.
- [Add entrance and exit animations](./transitions/): choose an effect, timing and the level where it applies.
- [Assign actions and connect values](./actions/): buttons, counters, conditional reveals and votes.

## Export and import

Splash pages use Foundry's journal export and import. Right-click their journal entry in the Journal sidebar and choose **Export Data**. To load that JSON into another journal, right-click the destination entry and choose **Import Data**. Import replaces the destination journal's data, so create a new entry when you want to keep both copies.

The imported handouts can open alongside their originals as separate windows.

## Viewing and trigger access

Players with Observer access can open a fullscreen Splash locally or open a handout. Launching one for another player, editing it and configuring triggers still require Owner access; a global launch requires a GM.

Binding a trigger grants read access to that Splash page. It leaves the parent journal and its other pages unchanged. Existing higher access and explicit page restrictions stay in place. If a particular player still cannot open it, check that page's Foundry ownership settings.

## Closing a fullscreen Splash

When the GM clicks an authored **Close** button in the current global Splash, it closes for everyone and removes the live controls. It stays closed after reload. A player’s Close button dismisses only their own view; the global launch remains active. Closing a journal handout or exiting preview affects only that window.

## Shared playback

Choose **Synced (shared state)** in the splash's Mode setting when players should share answers and progress. An active GM must be connected to save those shared changes. Built-in Increment actions count each accepted click, including clicks from different players at the same time; Set actions can reset the value again.
