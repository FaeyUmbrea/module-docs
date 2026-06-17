---
id: synced-mode
title: Synced Mode
sidebar_label: Synced Mode
---

# Synced Mode

A splash runs in one of two modes, set by the **mode** field on the splash. **Local** is the default. **Synced** gives the whole table one shared runtime, with every client showing the same thing.

| Mode | What it means |
|---|---|
| `local` | Every client runs its own copy. Clicking a button, loading a state, or changing a value affects only that screen. |
| `synced` | One shared runtime state for the whole table. Edits made anywhere are reflected on every screen. |

In local mode there is nothing to coordinate. Each player drives their own instance and nothing crosses between them. The rest of this page is about synced mode.

## Where the shared state lives

A synced splash keeps its live runtime state in a flag on the journal page: which states are loaded, the named [values](./actions.md), and any inline-macro overrides. Foundry replicates that flag to every connected client, so when it changes, every open copy of the splash mirrors the new snapshot.

Only a GM can write that flag. That single rule shapes the whole flow below.

## How players drive it

When a player interacts with a synced splash, the action runs locally first for instant feedback. The resulting snapshot is then proxied to the GM, who persists it to the page flag. Foundry replicates the flag, and every client (including the player who acted) mirrors the stored state.

So a player's click never waits on a round-trip to feel responsive. Their own screen reacts immediately. The GM write and the replication that follows reconcile everyone to the same authoritative state a moment later.

The GM does not blindly trust what a player proxies. Before persisting, the incoming snapshot is pruned against the splash's own structure: only states the splash actually defines, and overrides for sprites that actually exist, survive. A player can nudge real runtime state but cannot bring back states the splash no longer declares or overrides for sprites that no longer exist.

## Votes

Votes are the one action that does not run locally. Because a vote is attributed to the user who cast it, every vote is forwarded to the GM, who keeps a per-user ledger. One vote per player; recasting switches it.

How tallies surface depends on the splash's **voteVisibility** setting.

| `voteVisibility` | Behavior |
|---|---|
| `all` | Tallies are written into the shared values as `vote:<optionId>` and become visible to players. Interpolate `{vote:<optionId>}` into text to show a live count. |
| `gm` | Tallies stay on the GM client and are not pushed into shared values. |

See [Actions & Interactivity](./actions.md) for wiring a button to the vote action.

## Editing while it runs

If you change the splash's structure while a synced copy is live, the stored snapshot can end up referencing states or sprites that no longer exist. When that happens the GM prunes the stored flag, dropping the parts the splash no longer backs, so the shared state stays consistent with what the splash defines.

## Permissions

A player needs at least **Observer** permission on the page to read a synced splash. Without it, Foundry hands their client a blank shell and the splash cannot render.

You do not have to set this by hand for [trigger-launched](./triggers.md) splashes. When a splash is raised by a trigger, the GM grants the page and its parent journal Observer for everyone. Existing permission levels only rise, never drop, so a hand-tuned higher level is left alone.

One thing to watch. Raising the journal to Observer also exposes sibling pages that inherit the journal's default ownership. If a trigger-launched splash shares a journal with pages that must stay hidden, keep that splash in its own journal.

For launching a splash you triggered yourself versus opening one to view, see [Triggers](./triggers.md). The presentation kinds (scene, HUD, full, handout) are covered in [Layers & Modes](./layers-and-modes.md).
