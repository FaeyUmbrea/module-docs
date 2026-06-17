---
id: effects
title: Effects & Animations
sidebar_label: Effects & Animations
---

# Effects & Animations

Splash draws your objects through one of two renderers. The WebGL renderer runs PIXI with shader filters and can play entrance/exit animations and persistent effects. The plain-HTML renderer mounts objects as DOM and draws no shaders at all. Which one you get is a client setting, so what a given player sees depends on their machine, not yours.

## The renderer setting

**Splash Renderer** is a per-client setting in the module config. It has three values:

| Value | Renderer |
|---|---|
| **Automatic** | Picks `webgl` when Foundry's canvas performance mode is **High** or above, otherwise `html`. This is the default. |
| **WebGL** | Always the PIXI renderer. Shader effects and animations play. |
| **Plain HTML** | Always the DOM renderer. No shader effects, no animations. |

Because the setting is client-scoped, a player on a weak machine can drop to **Plain HTML** while the rest of the table runs WebGL. The splash still works for them, but shader effects will not render and objects appear and disappear without an animation. Build your splashes so they read correctly even when nothing animates.

The HTML renderer also skips any object whose type it has no component for, and logs a warning instead of drawing it.

## Effects

Effects are persistent shader filters applied to a single object for its whole life on screen. They are not timed transitions, they just sit on the object until it is destroyed. Effects are WebGL-only. The HTML renderer ignores the `effects` array entirely.

You add effects per object in the editor's object inspector, under the effects subsection: pick a type and configure its fields. You can stack multiple effects on one object — they apply as filters in order. Four effects ship.

**Glitch** — horizontal tear bands with chromatic separation.

| Field | Default | What it does |
|---|---|---|
| **Bands** | `8` | Number of horizontal tear bands. |
| **Intensity** | `0.01` | Tear distance, as a fraction of the width. |
| **Tint** | `#0044ff` | Color mixed into the displaced bands. |

**Pixelate** — a blocky mosaic.

| Field | Default | What it does |
|---|---|---|
| **Block W** / **Block H** | `8` / `8` | Cell size in pixels (rectangular cells are allowed). |
| **Offset X** / **Offset Y** | `0` / `0` | Shifts the cell grid, to nudge the mosaic off a seam. |

**Curvature** — a CRT-style barrel bulge that compresses the image toward the edges.

| Field | Default | What it does |
|---|---|---|
| **Strength** | `0.1` | How far the image bulges. |
| **Curve start** | `0.8` | Distance from center where the curve leaves flat. |
| **Curve end** | `2` | How far the ramp runs past that. |

**Scanlines** — periodic CRT scan lines down the image.

| Field | Default | What it does |
|---|---|---|
| **Intensity** | `0.3` | Strength of the lines. |
| **Thickness** | `4` | Band period, in pixels. |
| **Line color** | `#000000` | Color mixed in at each line (black = plain darkening). |
| **Steps** | `1` | Brightness levels across the falloff; `1` is a hard line. |

Register your own effect types through the [API](./api.md).

## Animations

Animations are timed transitions that play once. An **animation in** runs when an object enters, an **animation out** runs when it leaves. Three types ship: **dissolve**, **glitch**, and **pixelate**.

Both share a timing pair and an origin setup:

| Field | What it does |
|---|---|
| **Duration** | How long the transition runs, in milliseconds. |
| **Delay** | Milliseconds to wait before it starts. |
| **Origins** | Where the effect seeds from. **Random** scatters a chosen count of origin points; **Fixed** lets you place specific points with the visual origin editor. |

Glitch adds **Bands** (default `20`), **Intensity** (default `0.05`), **Tint** (`#0044ff`), and an **Invert** toggle. Pixelate adds a **Block size** (default `32`, the peak cell size the image dissolves into along the wave front) and an **Invert** toggle.

Like effects, animations are WebGL-only. Under the HTML renderer they are skipped and objects switch instantly.

### Where an animation comes from

You can set animations at three levels, and they cascade. For entrances the resolution order is **state, then object, then splash**: a per-state animation in wins over the object's own, which wins over the splash default. For exits the order is **object, then state, then splash**. The first one found is used, so set a default on the splash and override it where a specific object or state needs something different.

You configure these in the editor:

- **Splash level** — the splash inspector has **animation in** and **animation out**. These are the table-wide defaults.
- **Object level** — the object inspector has its own **animation in** and **animation out** for that object across all states.
- **Per-state placement** — when an object is placed in a state, that placement has its own **animation in** and **animation out** for when the object enters or leaves through that state.

Animations can be saved to and loaded from the [preset library](./presets.md) from the animation editor.

## Outros and teardown

When a splash closes, it plays its outro before it tears down. Every on-screen object runs its **animation out**, and Splash waits for the longest one to finish before destroying anything, so the exit is actually seen. If nothing has an out-animation with a non-zero duration, the splash tears down immediately.

Out-animations also fire during normal play whenever a state unloads and an object has no remaining state to transition into. See [Layers & Modes](./layers-and-modes.md) for how states load and unload, and [Actions & Interactivity](./actions.md) for the `change-state` action that drives those transitions.

Restored splashes (the ones brought back after a reload) appear instantly with animations suppressed, so nothing behind them is glimpsed mid-transition.
