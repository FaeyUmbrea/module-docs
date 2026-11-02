---
title: "Integration notes"
---

Scene Levels changes occlusion on the OBS client. Its development build exposes three helpers after Foundry's `ready` hook: `isObsClient()`, `dissolveStyle`, and `getDissolveOcclusionShaderClass()`.

`isObsClient()` asks the OBS Utils host whether this client is the stream client. It returns `false` when the host is unavailable. `dissolveStyle` holds the shared noise scale, edge width, and animated time offset. The shader helper returns the cached dissolve shader class, or `null` when Foundry's base shader is unavailable.
