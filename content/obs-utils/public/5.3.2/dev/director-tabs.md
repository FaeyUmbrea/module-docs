---
title: "Director tabs"
---

Use `registerDirectorTabSvelte5()` when adding a Svelte 5 tab from your own module bundle. Your module mounts its component with its own Svelte runtime, then gives OBS Utils a cleanup function.

```ts
import { mount, unmount } from 'svelte';
import MyTab from './MyTab.svelte';

obs.registerDirectorTabSvelte5({
  key: 'my-module.weather',
  label: 'my-module.tabs.weather',
  icon: 'fas fa-cloud',
  order: 100,
  mount: (target, props) => {
    const app = mount(MyTab, { target, props });
    return () => { void unmount(app); };
  },
});
```

The component receives `disabled`. Respect that prop when rendering controls. The cleanup callback should tear down the mounted UI and release any subscriptions your tab owns.

Built-in tabs use orders 10, 20, and 30. Third-party tabs default to 100, after those built-ins. Use a stable namespaced key and a localization key for the label.

## Why the mount callback matters

A Svelte 5 component compiled into your module belongs to your bundle's effect context. Passing it directly to OBS Utils' older `registerDirectorTab()` method can fail with `effect_orphan` because the host tries to mount it through a different runtime.

The mount callback keeps mounting and unmounting in your module. `registerDirectorTab()` still exists in this release, but its direct-component form is deprecated for this cross-bundle Svelte 5 use.

[DirectorTabSvelte5Registration](../interfaces/directortabsvelte5registration/) contains the released shape.
