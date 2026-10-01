---
title: "Integrating with OBS Utils"
---

OBS Utils exposes a registration API for modules that add overlay events, actor-value fields, overlay types, or Director tabs. Register the feature once, then feed it data when your system's events happen.

This guide covers **public OBS Utils 5.3.0**. Check the installed host before using it; another edition or an older host is not automatically the same contract.

## Choose your integration

- [Events and actor values](./events-and-actor-values/) shows how to register a trigger, fire it, and provide fields for the actor-value picker.
- [Director tabs](./director-tabs/) covers mounting your module's Svelte UI safely across bundles.
- [API reference](./api-reference/) lists the exported contracts from the 5.3.0 declaration archive.

## Get the runtime API

```js
Hooks.once('init', () => {
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

The declaration archive contains package metadata named `@faeyumbrea/obs-utils-api-types` **5.3.0**. Install the exact release artifact:

```sh
npm install --save-dev --save-exact https://github.com/FaeyUmbrea/obs-utils/releases/download/5.3.0/obs-utils-api-types.tgz
```

```ts
import type { ObsUtilsApi, OverlayTriggerRegistration } from '@faeyumbrea/obs-utils-api-types';

const trigger: OverlayTriggerRegistration = {
  key: 'my-module.sceneCue',
  name: 'my-module.triggers.sceneCue',
};
```

These are compile-time declarations. Foundry supplies the runtime module; do not import the package as a JavaScript implementation. The package also declares Foundry and Svelte type dependencies for the contracts it exports.

The [previous integration guide](/obs-utils/legacy/current/dev/api/) remains available for older integrations. Use this release's reference when the signatures differ.
