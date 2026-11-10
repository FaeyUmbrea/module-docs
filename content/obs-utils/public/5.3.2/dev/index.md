---
title: "Integrating with OBS Utils"
---

OBS Utils exposes a registration API for modules that add overlay events, actor-value fields, overlay types, or Director tabs. Register the feature once, then feed it data when your system's events happen.

This guide covers **public OBS Utils 5.3.2**.

## Choose your integration

- [Events and actor values](./events-and-actor-values/) shows how to register a trigger, fire it, and provide fields for the actor-value picker.
- [Director tabs](./director-tabs/) covers mounting your module's Svelte UI safely across bundles.
- [API reference](./api-reference/) lists the exported methods and types.

## Get the runtime API

```js
Hooks.once('obs-utils.init', () => {
  const host = game.modules.get('obs-utils');
  const obs = host?.api;
  if (!host?.active || !obs) return;

  obs.registerOverlayTrigger({
    key: 'my-module.sceneCue',
    name: 'my-module.triggers.sceneCue',
    icon: 'fas fa-film',
  });
});
```

Declare OBS Utils as a module dependency when your integration requires it. Keep an optional integration behind the availability check instead of failing your whole module.

Namespace registration keys with your module ID. They are saved in user configuration, so keep them stable between releases. Display labels are usually localization keys; ship matching entries in your module's language files.

## Use the release's types

Install the API types for this release:

```sh
npm install --save-dev --save-exact @faeyumbrea/obs-utils-api-types@1.1.0
```

```ts
import type { ObsUtilsApi, OverlayTriggerRegistration } from '@faeyumbrea/obs-utils-api-types';

const trigger: OverlayTriggerRegistration = {
  key: 'my-module.sceneCue',
  name: 'my-module.triggers.sceneCue',
};
```

These are compile-time declarations. Foundry supplies the runtime module; do not import the package as a JavaScript implementation. Use your integration’s own Foundry and Svelte types alongside these declarations.

The [previous integration guide](/obs-utils/legacy/current/dev/api/) remains available for older integrations. Use this release's reference when the signatures differ.

## API version for 5.3.2

This release uses the Public API package `@faeyumbrea/obs-utils-api-types@1.1.0`. Premium releases use their own early-access package versions; use the exact version listed for your module release.

- [Overlay bundle format](./overlay-bundles/) — package assets and support image fields in custom components.
