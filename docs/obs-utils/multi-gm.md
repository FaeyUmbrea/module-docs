---
id: multi-gm
title: Multi-GM Co-DM Handover
sidebar_label: Multi-GM Handover
---

# Multi-GM Co-DM Handover

When multiple GM accounts are online (a primary GM plus one or more Co-DMs), OBS Utils designates exactly one as the **active GM**. That's whose viewport gets mirrored by `Clone Active GM` mode on the OBS view.

## The Co-DMs tab

Open the Director and switch to the **Co-DMs** tab. It lists every GM-permissioned user in the world with their online status:

![Director Co-DMs tab](./assets/director-codms.png)

- **Online + active** — gold "in control" badge with a star icon.
- **Online + not active** — for your own row, a **Take Active** button appears.
- **Offline** — greyed out with an "offline" tag.

Click **Take Active** on your own row to claim the active seat. OBS Utils negotiates a handover with the current active GM over socket and:

1. Reads the previous active GM's current viewport.
2. Pans your camera to that viewport (so the OBS view doesn't snap).
3. Updates the `activeGMUserId` world setting to your user ID.
4. From this point on, your pans drive the `Clone Active GM` mirror.

The handover settles the camera animation before honoring further pans, so the OBS view stays continuous.

## Who's active by default?

If `activeGMUserId` is unset or points to an offline user, OBS Utils falls back to the first online GM in the world's user list. The first GM to log in is typically active until someone explicitly claims it.

## Empty state

The Co-DMs tab shows a friendly empty state when only one GM-permissioned account exists in the world. The handover mechanism doesn't apply unless there are at least two GMs to swap between.
