---
title: "Sending chat messages"
---

Ethereal Plane 3.3.0 exposes a small API for sending a message to its connected chat service. It does not expose public methods for creating polls or managing its connection through this API.

## Get the API

The module attaches its API during `init` and then emits `ethereal-plane.init`. For an integration that needs to react as soon as it exists, subscribe to that hook before initialization:

```js
Hooks.once('ethereal-plane.init', () => {
  const api = game.modules.get('ethereal-plane')?.api;
  if (!api) return;
  // Keep the API for your integration's later action handlers.
});
```

For a macro or action running after Foundry is ready, read the API directly and check that the module is active.

## Send a message

```js
const module = game.modules.get('ethereal-plane');
if (module?.active && module.api) {
  module.api.sendMessageToChat('Hello from Foundry!');
}
```

`sendMessageToChat(message)` takes a string. The world's `allow-api` setting must be enabled; otherwise the method does nothing. In this release that setting is hidden from the standard settings form and defaults to `false`.

This is an explicit world opt-in. A GM who wants to allow integrations can enable it with:

```js
await game.settings.set('ethereal-plane', 'allow-api', true);
```

Do not enable it automatically from your integration. The streamer also needs a working chat connection. The method returns no delivery result or promise, so awaiting it does not confirm that chat received the message.

## Scope of this release

The guide is checked against the **3.3.0** source, not the development branch. There is no published declaration archive for this release, so there is no generated type reference here. Internal poll, trigger, and connection classes are not additional public API methods.
