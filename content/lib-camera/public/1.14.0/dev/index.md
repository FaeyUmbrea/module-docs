---
title: "Integrating with libCamera"
---

If your module moves the camera, register it with libCamera rather than competing with every other module that pans the canvas. You get a consumer that requests control on this client. The user decides which integrations take priority.

This guide covers **libCamera 1.14.0**, for **Foundry 14** and API major **1**.

## Start with the job you need

- [Ownership and movement](./ownership-and-movement/) covers registration, one-off moves, longer sequences, and cleanup.
- [Coordinates and framing](./coordinates-and-framing/) explains scene pixels, zoom, rectangles, and fitting tokens into the view.
- [Following and remote clients](./following-and-remote-clients/) covers continuous tracking, subscriptions, and requests to other users.
- [API reference](./api-reference/) gives you the exact signatures exported with this release.

## Get the API

The runtime API is `game.modules.get('lib-camera').api`. Registration is available during `init`; movement needs a ready canvas. Use the module's actual ID, `lib-camera`, rather than its display name.

```js
let camera;
let consumer;

Hooks.once('init', () => {
  camera = game.modules.get('lib-camera')?.api;
  if (!camera || camera.apiMajor !== 1) return;

  consumer = camera.register({
    id: 'my-module',
    name: 'My module',
    priority: 10,
  });
});
```

Keep the returned consumer for later use. Registering the same ID twice throws; opening your module's window again should reuse its registration.

Declare libCamera as a required module dependency if your feature cannot work without it. For an optional camera feature, handle an absent API and leave the rest of your module usable.

## Use the released types

The generated reference comes from the exact npm package `@faeyumbrea/lib-camera-api-types` **1.14.0**. Install the exact version matching the release you support:

```sh
npm install --save-dev --save-exact @faeyumbrea/lib-camera-api-types@1.14.0
```

Then use a type-only import:

```ts
import type { CameraBounds, ModuleApi } from '@faeyumbrea/lib-camera-api-types';

const camera = game.modules.get('lib-camera')?.api as ModuleApi | undefined;
const region: CameraBounds = { x: 500, y: 300, width: 200, height: 300 };
```

The package supplies declarations, not a second copy of libCamera. Foundry still loads the module, and your integration still needs to check its runtime API. Keep your project's Foundry types installed too.
