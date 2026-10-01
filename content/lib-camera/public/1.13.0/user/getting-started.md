---
title: "Getting started"
---

In Foundry Setup, open **Add-on Modules → Install Module** and paste this manifest URL:

```text
https://github.com/FaeyUmbrea/foundry-lib-camera/releases/download/v1.13.0/module.json
```

This release is for **Foundry 13.351 or later**. Foundry will offer to install libWrapper if you do not already have it.

Enable libCamera and libWrapper in your world's module management. Then open **Game Settings → Configure Settings → libCamera → Open camera controls**.

libCamera is a shared library. It does not start moving your camera on its own; another module requests control through it.

## Check that it is working

The camera controls panel shows registered modules and the current camera owner. If no module has registered yet, there is nothing for libCamera to coordinate.

[Open the camera controls guide](../camera-controls/) for the stop buttons and keybinding.
