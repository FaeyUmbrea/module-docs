import { Component } from 'svelte';

export type EasingKind = "linear" | "easeIn" | "easeOut" | "easeInOut" | "power1.in" | "power1.out" | "power1.inOut" | "power2.in" | "power2.out" | "power2.inOut" | "power3.in" | "power3.out" | "power3.inOut" | "sine.in" | "sine.out" | "sine.inOut" | "back.in" | "back.out" | "back.inOut" | {
	cubicBezier: [
		number,
		number,
		number,
		number
	];
};
export type LoopMode = "none" | "restart" | "pingpong";
export interface CameraKeyframe {
	/** Absolute milliseconds from sequence start. */
	time: number;
	x: number;
	y: number;
	scale: number;
	/** Easing applied FROM the previous keyframe TO this one. */
	easing: EasingKind;
}
export interface CameraPreset {
	id: string;
	name: string;
	/** Legacy single-waypoint fields (still honored when `keyframes` is empty/missing). */
	x: number;
	y: number;
	scale: number;
	/** When non-empty, this preset is a keyframed sequence; top-level x/y/scale are ignored at playback. */
	keyframes?: CameraKeyframe[];
	loop?: LoopMode;
	/**
	 * Composition duration in ms. Defines the playback window — the timeline
	 * holds at the last keyframe's values until this time elapses, so loop
	 * (especially ping-pong) bounces at the full duration rather than at the
	 * last keyframe. Optional; absent presets default to the last keyframe time.
	 */
	durationMs?: number;
}
export interface SequenceController {
	/** Stop and dispose. Idempotent. */
	stop: () => void;
	/** Pause at current position. */
	pause: () => void;
	/** Resume from pause. */
	resume: () => void;
	/** Manually scrub to a specific time in ms (clamped to [0, duration]). */
	scrub: (timeMs: number) => void;
	/** Total duration in ms. */
	duration: () => number;
	/** True while the animation is actively playing. */
	isPlaying: () => boolean;
}
export type AnimatablePropertyKey = "opacity" | "x" | "y" | "rotation" | "scaleX" | "scaleY";
export type EasingInterpolation = "constant" | "linear" | "bezier";
export type EasingEquation = "sinusoidal" | "quadratic" | "cubic" | "quartic" | "quintic" | "exponential" | "circular" | "back" | "bounce" | "elastic";
export type EasingDirection = "in" | "out" | "inout" | "auto";
export interface EasingV2 {
	interpolation: EasingInterpolation;
	equation?: EasingEquation;
	direction?: EasingDirection;
}
export interface PropertyKeyframe {
	t: number;
	v: number;
	easing?: EasingV2;
}
export interface TrackKeyframe {
	t: number;
	opacity?: number;
	x?: number;
	y?: number;
	rotation?: number;
	scaleX?: number;
	scaleY?: number;
	ease?: string;
}
export interface TrackComponentLane {
	componentId: string;
	keyframes: TrackKeyframe[];
	propertyKeyframes?: Partial<Record<AnimatablePropertyKey, PropertyKeyframe[]>>;
}
export type TrackBehavior = {
	type: "static";
} | {
	type: "looping";
} | {
	type: "transition-on-end";
	toTrackId: string;
	toTime: number;
};
export type ZoneDestination = {
	type: "goto";
	toTrackId: string;
	toTime: number;
} | {
	type: "ignore";
};
export interface TransitionZone {
	startT: number;
	endT: number;
	destination: ZoneDestination;
}
export interface TrackTransition {
	triggerKey: string;
	fromTrackId: string;
	zones: TransitionZone[];
}
export interface OverlayTrack {
	id: string;
	name: string;
	durationMs: number;
	behavior: TrackBehavior;
	lanes: TrackComponentLane[];
}
export interface OverlayAnimationData {
	tracks: OverlayTrack[];
	initialTrackId: string;
	transitions: TrackTransition[];
}
/**
 * One field in a trigger's payload schema. Drives both the editor's condition
 * inputs (when filter !== false) and the value paths components can reference
 * via `trigger.X` (when display !== false).
 */
export interface TriggerPayloadField {
	/** Storage / lookup key. */
	key: string;
	type: "number" | "string" | "boolean" | "Actor" | "ChatMessage" | "Roll";
	/** i18n key for the label. Resolved via game.i18n.localize() at render time. */
	label: string;
	/** Default value used when the editor seeds a fresh condition. */
	default?: any;
	/** If false, this field cannot be referenced via trigger.<key>. Defaults to true. */
	display?: boolean;
	/** If false, this field is not exposed to the editor condition inputs. Defaults to true. */
	filter?: boolean;
}
declare class OBSEvent {
	targetAction: string;
	sceneName: string;
	targetName: string;
}
/**
 * One configured firing of a registered OBS Remote event type — the per-instance
 * condition values the user filled in (matched against context at fire time)
 * plus the OBS actions to run when the matcher passes.
 */
export interface CustomEventInstance {
	conditions: Record<string, any>;
	actions: OBSEvent[];
}
/**
 * How the renderer iterates an overlay across contexts.
 *  - `'actors'` (default) — one tile per actor in the bound actor list. Ambient overlays like HP bars.
 *  - `'players'` — one tile per non-GM user. Useful for roll-banner triggered overlays.
 *  - `'users'` — one tile per active user (includes GMs).
 *  - `'once'` — singleton. The overlay mounts once regardless of context.
 */
export type OverlayTileMode = "actors" | "players" | "users" | "once";
export declare class OverlayData {
	type: string;
	components: OverlayComponentData[];
	style: string;
	config: Record<string, any>;
	name?: string;
	enabled?: boolean;
	/**
	 * Tracks + transitions + zones. Drives all reactive visibility and
	 * transform behavior. Absent ⇒ overlay is fully ambient (no animation).
	 */
	animation?: OverlayAnimationData;
	tileBy?: OverlayTileMode;
	id?: string;
	customCSS?: string;
	constructor(type?: string, components?: never[], style?: string, config?: Record<string, any>, name?: string, enabled?: boolean);
}
export declare class OverlayComponentData {
	type: string;
	data: string;
	style: string;
	x?: number;
	y?: number;
	w?: number;
	h?: number;
	rotation?: number;
	locked?: boolean;
	id?: string;
	customCSS?: string;
	constructor(type?: string, data?: string, style?: string);
}
export interface LegacyRollOverlayConfig {
	preRollEnabled?: boolean;
	postRollEnabled?: boolean;
	preRollDelay?: number;
	preRollFadeIn?: number;
	preRollFadeOut?: number;
	preRollStay?: number;
	rollFadeIn?: number;
	rollFadeOut?: number;
	rollStay?: number;
	postRollFadeIn?: number;
	postRollFadeOut?: number;
	postRollStay?: number;
	preRollImage?: string;
	rollBackground?: string;
	rollForeground?: string;
	postRollImage?: string;
}
export interface DirectorState {
	/** The user-configured tracking mode when combat is active. */
	trackingModeInCombat: string;
	/** The user-configured tracking mode out of combat. */
	trackingModeOutOfCombat: string;
	/** Whether a combat is currently active. */
	isInCombat: boolean;
	/** The currently-active tracking mode (in-combat or out-of-combat depending on state). */
	activeTrackingMode: string;
	/** User ID of the OBS-mode (focused) user, or null. */
	obsModeUserId: string | null;
}
export interface ActorValue {
	value: string;
	label: string;
	$created?: boolean;
}
export type ActorValues = ActorValue[];
/**
 * Grouped variant — system modules can ship a richer hierarchical layout via
 * `api.setAVDataGrouped`. Picker components consume the grouped form via
 * `getActorValueGroups` and pass it straight to the picker. Flat data set via
 * legacy `setAVData` is wrapped in a single anonymous group, so the picker only
 * has one code path.
 */
export interface ActorValueGroup {
	/** i18n key for the group label. Resolved at set time. */
	label: string;
	/** Lower numbers sort earlier in the picker. Defaults to 100. */
	order?: number;
	items: ActorValue[];
}
export interface OBSRemoteConditionField {
	/** Storage key on the configured instance's `conditions` object. */
	key: string;
	/** What the user fills in. */
	type: "number" | "string" | "boolean";
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
	setTrackingMode(slot: "inCombat" | "outOfCombat", mode: string): Promise<void>;
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
/** Public compile-time contract for modules integrating with OBS Utils. */
export type ObsUtilsModuleId = "obs-utils" | "obs-utils-premium";

export {};
