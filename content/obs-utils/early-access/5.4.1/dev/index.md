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

The matching API type package has not been published yet. There is no generated API reference for 5.4.1 here; the public edition's historical declarations are not a verified substitute for this release.
