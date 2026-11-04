---
title: "Integrating with OBS Utils Premium"
---

This guide is for **OBS Utils Premium 5.4.1**, installed as `obs-utils-premium`. The public edition uses a different module ID. Check the enabled edition before obtaining its API.

```js
Hooks.once('obs-utils.init', () => {
  const host = game.modules.get('obs-utils-premium');
  if (!host?.active || !host.api) return;
  host.api.registerOverlayTrigger({
    key: 'my-module.sceneCue',
    name: 'my-module.triggers.sceneCue',
    icon: 'fas fa-film',
  });
});
```

Use stable, namespaced registration keys and provide matching localization entries. Declare the Premium module as a dependency when it is required; guard optional integrations when it is absent.

## Integration guides

- [Events and actor values](./events-and-actor-values/) covers trigger payloads, OBS actions and system actor fields.
- [Director tabs](./director-tabs/) covers mounting Svelte 5 tabs with your own module's runtime.
- [API reference](./api-reference/) documents this release's exported contracts.

## Install the matching types

```sh
npm install --save-dev --save-exact @faeyumbrea/obs-utils-api-types@1.1.0-ea.5.4.1
```

```ts
import type { ObsUtilsApi, OverlayTriggerRegistration } from '@faeyumbrea/obs-utils-api-types';
```

These declarations are for compile-time checking. Obtain the runtime API from Foundry's enabled `obs-utils-premium` module; the types package isn't a JavaScript implementation.

- [Overlay bundle format](./overlay-bundles/) — package assets and support image fields in custom components.
