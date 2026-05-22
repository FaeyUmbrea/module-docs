---
id: director-api
title: Director API (module authors)
sidebar_label: Director API
---

# Director API

Third-party Foundry modules can plug into the Stream Director — add custom tabs, read tracking state, react to mode changes. Added in 5.1.

This page is for **module authors**. End users don't interact with the Director API directly.

## Registering a tab

```js
Hooks.once('obs-utils.init', () => {
    const api = game.modules.get('obs-utils').api;
    api.registerDirectorTab({
        key: 'my-module.weatherTab',
        label: 'my-module.directorTab.weather',  // i18n key
        icon: 'fas fa-cloud-rain',
        component: MyWeatherTab,  // Svelte component constructor
        order: 100,
    });
});
```

`order` controls placement in the tab bar. Built-in tabs use 10 (Controls), 20 (Presets), 30 (Co-DMs). Module tabs default to 100 so they land after built-ins.

The component receives a single `disabled` prop (boolean, true when no GM is online). Anything else your tab needs, pull from `game` or your own state.

The registry is **last-writer-wins** by key — re-registering an existing key replaces the previous component.

## Reading Director state

```js
const state = api.getDirectorState();
// {
//   trackingModeInCombat:     'trackTurnPlayer',
//   trackingModeOutOfCombat:  'birdseye',
//   isInCombat:               true,
//   activeTrackingMode:       'trackTurnPlayer',
//   obsModeUserId:            'abc123' | null,
// }
```

`activeTrackingMode` is `trackingModeInCombat` when combat is active, otherwise `trackingModeOutOfCombat`.

`obsModeUserId` is the user id of the player whose perspective the OBS-mode client follows. `null` means no specific user is bound.

## Subscribing to state changes

```js
Hooks.on('obs-utils.director.stateChanged', (next, prev) => {
    if (next.isInCombat !== prev?.isInCombat) {
        // combat just started or ended
    }
    if (next.activeTrackingMode !== prev?.activeTrackingMode) {
        // tracking switched
    }
});
```

The hook fires when any of these change:

- `defaultInCombat` setting
- `defaultOutOfCombat` setting
- `obsModeUser` setting
- Combat starts (`combatStart`)
- Combat ends (`deleteCombat`)

`prev` is `undefined` on the very first emission after `initDirectorStateBridge` runs.

## Writing Director state

```js
await api.setTrackingMode('inCombat', 'birdseye');
// or
await api.setTrackingMode('outOfCombat', 'trackOne');
```

This is identical to the user picking the mode in the Controls tab — a settings write that fires the `stateChanged` hook.

Mode values are strings; the valid options match `ICCHOICES` / `OOCCHOICES` in obs-utils' source (`src/utils/const.ts`). Common values:

- `birdseye`
- `trackAll`
- `trackOne`
- `trackTurnPlayer`
- `clonePlayer`
- `cloneDM`
- `trackManual`

## Example: a companion module that switches scene level by active combatant

```js
Hooks.once('obs-utils.init', () => {
    const api = game.modules.get('obs-utils').api;

    Hooks.on('obs-utils.director.stateChanged', (next, prev) => {
        if (!next.isInCombat) return;
        if (next.activeTrackingMode !== 'trackTurnPlayer') return;
        const combat = game.combat;
        if (!combat?.combatant) return;
        const tokenElevation = combat.combatant.token?.elevation ?? 0;
        const level = mapElevationToSceneLevel(tokenElevation);
        await setSceneViewLevel(level);
    });
});
```

The pattern: subscribe to Director state, derive what your module needs to do, perform the side effect.

## API surface summary

```typescript
interface ObsUtilsApi {
    // Tab registry
    directorTabs: Map<string, DirectorTabRegistration>;
    registerDirectorTab(reg: DirectorTabRegistration): void;

    // State surface
    getDirectorState(): DirectorState;
    setTrackingMode(slot: 'inCombat' | 'outOfCombat', mode: string): Promise<void>;

    // Preset playback
    // Broadcast path — claims active-GM control, switches tracking modes to
    // cloneDM, pauses the DM's outgoing stream, and plays the preset on every
    // OBS client. No return value.
    playPreset(preset: CameraPreset): void;

    // Local-only preview — no broadcast, no state changes. Returns a controller
    // so you can pause, resume, scrub, or stop programmatically.
    previewPreset(preset: CameraPreset): SequenceController;

    // Migration utility
    // Build a wysiwyg (canvas) overlay equivalent to the 4.x roll overlay from
    // a legacy config object. Returns an OverlayData value — push it into
    // streamOverlays yourself. Does not touch settings.
    // @see migrate-from-v4.md for the console snippet that calls this.
    buildLegacyRollOverlayCanvas(config: LegacyRollOverlayConfig): OverlayData;
}

interface SequenceController {
    stop(): void;
    pause(): void;
    resume(): void;
    scrub(timeMs: number): void;
    duration(): number;
    isPlaying(): boolean;
}

interface DirectorTabRegistration {
    key: string;
    label: string;       // i18n key
    icon?: string;       // FA class
    component: Component;
    order?: number;
}

interface DirectorState {
    trackingModeInCombat: string;
    trackingModeOutOfCombat: string;
    isInCombat: boolean;
    activeTrackingMode: string;
    obsModeUserId: string | null;
}
```

Hook emitted:

- `obs-utils.director.stateChanged` — payload `(next: DirectorState, prev: DirectorState | undefined)`
