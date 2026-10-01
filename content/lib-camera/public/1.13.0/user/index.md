---
title: "libCamera"
---

libCamera lets modules share control of your camera without fighting over it. You choose which module gets priority, and you can take control back whenever you need to.

This release is for **Foundry 13.351 or later**. libWrapper is required; 3D Canvas is optional.

## Where to start

- [Install libCamera](./getting-started/), then enable it alongside the modules that use it.
- [Camera controls](./camera-controls/) let you release a claim or stop camera control altogether.
- [Module priorities](./module-priorities/) decide who gets control when several modules ask for it.
- [3D Canvas](./3d-canvas/) covers the optional 3D integration.

Building a module that uses libCamera? Head to [Developer docs](../dev/).
