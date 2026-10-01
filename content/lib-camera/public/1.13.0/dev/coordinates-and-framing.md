---
title: "Coordinates and framing"
---

libCamera's 2D API uses unscaled **scene pixels**. Screen pixels and grid tiles are different units: pass scene coordinates for positions and bounds, and use the framing options when you want a margin in tiles.

## Positions and rectangles

`CameraPosition` describes the **centre** of the viewport. `CameraBounds` describes a rectangle by its **top-left corner** and size.

| Field | Unit | Meaning |
| --- | --- | --- |
| `CameraBounds.x` | Scene pixels | Left edge of the rectangle. |
| `CameraBounds.y` | Scene pixels | Top edge of the rectangle. |
| `CameraBounds.width` | Scene pixels | Horizontal size; must be greater than zero. |
| `CameraBounds.height` | Scene pixels | Vertical size; must be greater than zero. |
| `CameraPosition.x`, `y` | Scene pixels | Viewport centre. |
| `CameraPosition.scale` | Zoom factor | Larger values zoom in; must be greater than zero. |

All values must be finite. A rectangle can have negative coordinates; its width and height must still be positive.

```js
// On a scene with a 100px grid, this rectangle is two tiles wide and three tall.
const bounds = { x: 500, y: 300, width: 200, height: 300 };
const view = camera.frame([bounds], { margin: 1 });

if (view) {
  const result = await consumer.move({ ...view, duration: 500 });
  if (result.status !== 'completed') console.debug(result);
}
```

`frame()` only calculates a view. It does not move the camera or acquire ownership. For several rectangles, it fits the rectangle enclosing all of them.

## Padding and zoom limits

- `margin` adds space on **each side**, in grid tiles. It defaults to `0` and cannot be negative.
- `closest` is the minimum number of horizontal tiles visible. It prevents zooming in too far.
- `widest` is the maximum number of horizontal tiles visible. It prevents zooming out too far, so it can crop the requested region.

Both zoom limits must be finite and positive. If `widest` is smaller than `closest`, `closest` takes precedence.

```js
const view = camera.frame([bounds], { margin: 1, closest: 8, widest: 30 });
```

`frame()` returns `undefined` for an empty list, invalid bounds or options, or an unavailable viewport. Check the result before moving.

## Frame tokens or find a point

`camera.frameTokens(tokenIds, options)` accepts IDs of token placeables on the current scene. These are **token IDs**, not actor IDs or document UUIDs. Every requested token must exist and be visible on this client. An empty list or more than 1000 IDs produces no view.

```js
const ids = canvas.tokens.controlled.map(token => token.id);
const view = camera.frameTokens(ids, { margin: 1, closest: 8 });
if (view) await consumer.move({ ...view, duration: 500 });
```

Use `camera.tokenPosition(tokenId)` for a token's centre, or `camera.gridPosition(row, column)` for a grid cell's centre. Grid indices must be safe integers. Both helpers return `undefined` when the needed canvas or object is unavailable.

## Constrain a move

`bounds: true` keeps the viewport inside the scene rectangle. Pass a `CameraBounds` object instead to constrain it to a smaller region.

```js
await consumer.move({ x: 600, y: 450, duration: 500, bounds: true });
```

The constraint can increase zoom to fit the viewport inside the rectangle. This differs from `frame()`, which calculates a view showing the requested region.

The released signatures are [CameraBounds](../interfaces/camerabounds/), [CameraPosition](../interfaces/cameraposition/), and [FrameOptions](../interfaces/frameoptions/).
