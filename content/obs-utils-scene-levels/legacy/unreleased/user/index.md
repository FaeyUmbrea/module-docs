---
title: "OBS Utils \u00b7 Scene Levels"
---

Scene Levels softens the edge of Foundry's level reveal on the OBS stream view. Your own GM canvas keeps Foundry's normal occlusion.

This module is in development; there is no published release to install from this documentation yet.

## What you need

A Foundry 14 scene using built-in Scene Levels and an active OBS Utils stream client. The effect changes the edge of an existing reveal; it does not decide which floors are visible.

## Settings

**Dissolve Noise Scale** changes the grain size. **Dissolve Edge Width** changes how broad the softened edge is.

The defaults in the development build are 18 and 0.06 respectively. Start there and check the actual stream view before adjusting them.

If a Foundry update changes the underlying shader, the module falls back to the normal reveal rather than stopping the canvas from rendering.
