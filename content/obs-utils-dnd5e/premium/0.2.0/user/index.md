---
title: "OBS Utils · D&D 5e"
---

The D&D 5e companion adds readable actor values and transformation tracking to OBS Utils. If you don't use both OBS Utils and D&D 5e, you don't need this module.

This is the published **0.2.0** release for **Foundry 11**. It requires OBS Utils **2.4.0 or newer** and D&D 5e **2.2.2 or newer**, within the versions supported by that Foundry release.

## Readable actor values

The companion gives actor fields readable names: **Strength Value** instead of `system.abilities.str.value`, for example. Choose the field you want when configuring an actor overlay.

If a field is empty, check the actor's data. Not every actor has every value, and an empty value should not be treated as zero.

## Transformations

When an overlay's selected actor transforms, polymorphs, or wildshapes, the companion follows the transformed actor. Reverting the transformation restores the original actor selection.

This depends on the transformation information provided by the game system. Tracking more than one layer of transformation is not supported by this release.

## Installation

Install the module from your premium access and enable it in a compatible D&D 5e world alongside OBS Utils. The release's module ID is `obs-utils-dnd5`.

The [OBS Utils 4.0 docs](/obs-utils/legacy/4.0/user/) preserve the older host documentation. The current OBS Utils 5.3 guide covers a newer Foundry generation; use the companion release's compatibility bounds when choosing what to install.
