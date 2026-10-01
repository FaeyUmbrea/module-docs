---
title: "Integration notes"
---

Scene Levels changes occlusion on the OBS client. Its development build exposes three helpers after Foundry's `ready` hook: `isObsClient()`, `dissolveStyle`, and `getDissolveOcclusionShaderClass()`.

`isObsClient()` asks the OBS Utils host whether this client is the stream client. It returns `false` when the host is unavailable. `dissolveStyle` holds the shared noise scale, edge width, and animated time offset. The shader helper returns the cached dissolve shader class, or `null` when Foundry's base shader is unavailable.

These are development details, not a released integration contract. There is no released declaration archive to generate an API reference from.

These pages describe an unreleased module; they are not a compatibility promise for a published version.
