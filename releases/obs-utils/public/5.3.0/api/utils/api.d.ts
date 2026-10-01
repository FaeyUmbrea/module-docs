import type { Component } from 'svelte';
import type { CameraPreset } from './cameraPresets.ts';
import type { SequenceController } from './cameraSequencePlayer.ts';
import type { LegacyRollOverlayConfig } from './defaultOverlays.ts';
import type { DirectorState } from './directorState.ts';
import type { ActorValueGroup, ActorValues } from './helpers.ts';
import type { OverlayData, TriggerPayloadField } from './types.ts';
export interface OBSRemoteConditionField {
    /** Storage key on the configured instance's `conditions` object. */
    key: string;
    /** What the user fills in. */
    type: 'number' | 'string' | 'boolean';
    /**
     * i18n key for the field label. Resolved via `game.i18n.localize()` at
     * render time. Pass a literal string only if you are intentionally
     * shipping a single-locale module — the UI will display it verbatim.
     */
    label: string;
    /** Default value when a new instance is added. */
    default?: any;
}
export interface OBSRemoteEventTypeRegistration {
    /** Unique key — namespace with your module id (e.g. 'dnd5e.hpThreshold'). */
    key: string;
    /**
     * i18n key for the section header. Resolved via `game.i18n.localize()`
     * at render time. Pass a literal string only if you are intentionally
     * shipping a single-locale module — the UI will display it verbatim.
     */
    name: string;
    /** Optional Font Awesome icon class for the header (e.g. 'fas fa-heart'). */
    icon?: string;
    /** Per-instance condition fields the user fills in when configuring. */
    conditionFields?: OBSRemoteConditionField[];
    /**
     * Decide whether a configured instance should fire given its saved
     * `conditions` and the runtime `context` passed to triggerOBSRemoteEvent.
     * Omit → instance always fires.
     */
    matcher?: (conditions: Record<string, any>, context: any) => boolean;
}
export interface OverlayTriggerRegistration {
    /** Unique key — namespace with your module id (e.g. 'dnd5e.spellCast'). */
    key: string;
    /**
     * i18n key for the display name. Resolved via `game.i18n.localize()` at
     * render time. Pass a literal string only if you intentionally ship a
     * single-locale module — the UI will display it verbatim.
     */
    name: string;
    /** Optional Font Awesome icon class (e.g. 'fas fa-dice-d20'). */
    icon?: string;
    /** Fields carried in the event payload — drives editor condition inputs and trigger.X references. */
    payloadSchema?: TriggerPayloadField[];
}
export interface DirectorTabRegistration {
    /** Unique key — namespace with your module id (e.g. 'my-module.weatherTab'). */
    key: string;
    /** i18n key for the tab button label. */
    label: string;
    /** Optional Font Awesome icon class for the tab button. */
    icon?: string;
    /** Svelte component rendered when this tab is active. Receives `{ disabled }` prop. */
    component: Component;
    /** Sort order. Built-ins use 10/20/30; default for module tabs is 100 (placed after built-ins). */
    order?: number;
}
/**
 * Cross-bundle-safe Director tab. Instead of a component, you pass a `mount` callback that mounts the tab
 * with *your own* module's Svelte `mount()`. A Svelte 5 component from another bundle cannot be mounted by
 * OBS Utils' runtime — its runes resolve against your bundle's effect context, so OBS Utils mounting it
 * throws `effect_orphan`. Letting your module mount it fixes that. (A Svelte 4 module can `new Component()`
 * inside the same callback.)
 */
export interface DirectorTabSvelte5Registration {
    key: string;
    label: string;
    icon?: string;
    /**
     * Mount the tab UI into `target` (e.g. `mount(MyTab, { target, props })`) and return a cleanup
     *  function that tears it down (e.g. `() => unmount(app)`).
     */
    mount: (target: HTMLElement, props: {
        disabled: boolean;
    }) => (() => void);
    order?: number;
}
export declare class ObsUtilsApi {
    overlayTypes: Map<string, OverlayType>;
    overlayTypeNames: Map<string, string>;
    singleInstanceOverlays: Set<Component>;
    singleInstanceOverlaysSvelte5: Set<(target: HTMLElement) => (() => void)>;
    obsRemoteEventTypes: Map<string, OBSRemoteEventTypeRegistration>;
    overlayTriggers: Map<string, OverlayTriggerRegistration>;
    directorTabs: Map<string, DirectorTabRegistration | DirectorTabSvelte5Registration>;
    constructor();
    /** Public — modules call this in their init hook to expose a new event type. */
    registerOBSRemoteEventType(reg: OBSRemoteEventTypeRegistration): void;
    /** Public — modules call this to expose a new overlay trigger type. */
    registerOverlayTrigger(reg: OverlayTriggerRegistration): void;
    /**
     * Public — register a tab in the Director window.
     * @deprecated A Svelte 5 component from another module fails to mount here (`effect_orphan`). Use
     *   {@link registerDirectorTabSvelte5}, which lets your module mount its own UI. Still fine for
     *   OBS Utils' own (same-bundle) tabs.
     */
    registerDirectorTab(reg: DirectorTabRegistration): void;
    /** Public — register a Director tab whose UI your module mounts itself (cross-bundle-safe). */
    registerDirectorTabSvelte5(reg: DirectorTabSvelte5Registration): void;
    /**
     * Public — snapshot of Director state (tracking modes, combat, focused user).
     * Subscribe to `obs-utils.director.stateChanged` to react to changes; the
     * hook payload is `(next: DirectorState, prev: DirectorState | undefined)`.
     */
    getDirectorState(): DirectorState;
    /** Public — set one of the tracking-mode slots. Mirrors the Controls tab UI. */
    setTrackingMode(slot: 'inCombat' | 'outOfCombat', mode: string): Promise<void>;
    /**
     * Public — modules call this when their in-system event fires (e.g. a chat
     * message is created, a roll is made). Dispatches via Foundry's Hooks bus
     * so any number of overlay renderers can react without tight coupling.
     */
    fireOverlayTrigger(key: string, payload: Record<string, any>): void;
    /**
     * Public — modules call this when their in-system condition fires
     * (e.g. on `updateActor` with `system.attributes.hp.value` changed).
     * Looks up every configured instance for the type, runs the matcher,
     * and executes the configured OBS actions for instances that pass.
     *
     * Safe to call from any client; the actual OBS action execution is
     * already gated to the OBS-mode client by triggerOBSAction.
     */
    triggerOBSRemoteEvent(key: string, context?: Record<string, any>): Promise<void>;
    /**
     * Register a new overlay type. Surfaces in the Stream Composer's "+ new"
     * menu and elsewhere the type list is consumed.
     *
     * @param key Stable key written into `OverlayData.type` (e.g. 'wysiwyg').
     * @param readableName i18n key for the display label. Resolved via
     *   `game.i18n.localize()` at render time. Pass a literal string only if
     *   you intentionally ship a single-locale module.
     * @param type The OverlayType instance with the renderer and editor wired up.
     */
    registerOverlayType(key: string, readableName: string, type: OverlayType): void;
    /**
     * Build a `wysiwyg` (canvas) overlay that emulates the 4.x roll overlay.
     * Shared by the v4 migration (5.0 `type: 'roll'` entries) and the docs
     * snippet that pulls the user's legacy flat settings out of the world.
     *
     * The returned overlay is a 250×250 layer with `tileBy: 'players'`, a
     * `core.onPlayerRoll` transition out of the idle track, and the pre /
     * roll / post phases chained through `transition-on-end`.
     *
     * Push the result into `streamOverlays` (or import it through the
     * composer) — this helper is data-only and does not touch settings.
     */
    buildLegacyRollOverlayCanvas(config: LegacyRollOverlayConfig): OverlayData;
    registerUniqueOverlay(overlay: Component): void;
    /**
     * Register a unique overlay rendered once on the stream, for Svelte 5 modules. Pass a `mount` callback
     * that mounts your overlay into the given element with your own module's Svelte `mount()` and returns a
     * cleanup function — OBS Utils can't mount a Svelte 5 component from another bundle itself (effect_orphan).
     */
    registerUniqueOverlaySvelte5(mount: (target: HTMLElement) => (() => void)): void;
    getSelectedActors(): string[] | undefined;
    setSelectedActors(actorArray: string[]): Promise<void>;
    setAVData(actorValueArray: ActorValues): void;
    /**
     * Public — system modules call this with a hierarchical layout. The picker
     * UI renders groups in the dropdown. Group labels are i18n keys, localized
     * at flatten time. Calling this replaces any previously-set AV data
     * (grouped or flat) — last writer wins, same as `setAVData`.
     */
    setAVDataGrouped(groups: ActorValueGroup[]): void;
    /**
     * Public — system modules call this in their init hook to register their
     * own starter overlay set. The burger menu in the overlay editor imports
     * whichever set is registered (or the generic default if none). Last writer
     * wins.
     */
    registerStarterOverlays(overlays: OverlayData[]): void;
    getOBSWebsocketClient(): Promise<import("obs-websocket-js").OBSWebSocket> | undefined;
    isOBS(): boolean;
    /**
     * Public — play a camera preset on the OBS client. The DM that calls this
     * claims active-GM control, swaps the current tracking mode to cloneDM,
     * pauses their outgoing viewport stream, and broadcasts the preset so it
     * runs locally on every OBS client. The DM's own view does not move.
     *
     * For previewing a preset in the editor (no broadcast, no state changes),
     * call `playSequence` directly from `cameraSequencePlayer`.
     */
    playPreset(preset: CameraPreset): void;
    /**
     * Local-only preview play. Use this from the preset editor when scrubbing
     * or auditioning — doesn't touch tracking state and doesn't broadcast.
     */
    previewPreset(preset: CameraPreset): SequenceController;
}
export interface ImageSlotHandlers {
    /** Extract all image-ref strings from a component's data field. */
    extract: (data: string) => string[];
    /** Rewrite all image refs in data using the path-map. Return the new data string. */
    rewrite: (data: string, pathMap: ReadonlyMap<string, string>) => string;
}
export declare class OverlayType {
    overlayEditor: Component;
    overlayComponents: Map<string, Component<any, any, any>>;
    overlayClass: Component;
    overlayComponentNames: Map<string, string>;
    overlayComponentEditors: Map<string, Component<any, any, any>>;
    compactEditorButtons: Map<string, boolean>;
    overlayComponentImageSlots: Map<string, ImageSlotHandlers>;
    hasCustomOverlayEditor: boolean;
    perActor: boolean;
    constructor(overlayClass: Component<any, any, any>);
    registerOverlayEditor(editor: Component<any, any, any>): void;
    /**
     * Register a renderable component type for this overlay.
     *
     * @param key Stable key referenced from overlay data (e.g. 'pt', 'pb').
     * @param readableName i18n key for the display label. Resolved via
     *   `game.i18n.localize()` at render time. Pass a literal string only
     *   if you intentionally ship a single-locale module.
     * @param type The Svelte component class that renders the data.
     */
    registerComponent(key: string, readableName: string, type: Component<any, any, any>): void;
    registerComponentEditor(key: string, editor: Component<any, any, any>, compactButtons?: boolean): void;
    registerComponentImageSlots(key: string, handlers: ImageSlotHandlers): void;
}
export declare function registerDefaultTypes(): void;
//# sourceMappingURL=api.d.ts.map