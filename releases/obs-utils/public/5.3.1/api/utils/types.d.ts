import type { StringMap } from './const.ts';
import type { OverlayAnimationData } from './overlayAnimation.ts';
export type { OverlayAnimationData, OverlayTrack, TrackBehavior, TrackComponentLane, TrackKeyframe, TrackTransition, TransitionZone, ZoneDestination, } from './overlayAnimation.ts';
/**
 * One field in a trigger's payload schema. Drives both the editor's condition
 * inputs (when filter !== false) and the value paths components can reference
 * via `trigger.X` (when display !== false).
 */
export interface TriggerPayloadField {
    /** Storage / lookup key. */
    key: string;
    type: 'number' | 'string' | 'boolean' | 'Actor' | 'ChatMessage' | 'Roll';
    /** i18n key for the label. Resolved via game.i18n.localize() at render time. */
    label: string;
    /** Default value used when the editor seeds a fresh condition. */
    default?: any;
    /** If false, this field cannot be referenced via trigger.<key>. Defaults to true. */
    display?: boolean;
    /** If false, this field is not exposed to the editor condition inputs. Defaults to true. */
    filter?: boolean;
}
export declare class OBSEvent {
    targetAction: string;
    sceneName: string;
    targetName: string;
}
export declare class OBSWebsocketSettings {
    url: string;
    port: string;
    password: string;
}
export declare class SceneLoadEvent {
    sceneName: string;
    obsActions: never[];
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
export declare class OBSRemoteSettings implements StringMap {
    [key: string]: any;
    /** Legacy fields — retained for read-side migration only, no longer the source of truth. */
    onLoad: OBSEvent[];
    onCombatStart: OBSEvent[];
    onCombatEnd: OBSEvent[];
    onPause: OBSEvent[];
    onUnpause: OBSEvent[];
    onSceneLoad: SceneLoadEvent[];
    onStopStreaming: OBSEvent[];
    /**
     * Registry-driven storage. Keyed by the event type's registration key
     * (e.g. 'core.onCombatStart', 'dnd5e.hpThreshold'). Both built-in event
     * types (registered by obs-utils itself) and third-party module types
     * share this map.
     */
    customEvents: Record<string, CustomEventInstance[]>;
}
export declare function generateId(): string;
/**
 * How the renderer iterates an overlay across contexts.
 *  - `'actors'` (default) — one tile per actor in the bound actor list. Ambient overlays like HP bars.
 *  - `'players'` — one tile per non-GM user. Useful for roll-banner triggered overlays.
 *  - `'users'` — one tile per active user (includes GMs).
 *  - `'once'` — singleton. The overlay mounts once regardless of context.
 */
export type OverlayTileMode = 'actors' | 'players' | 'users' | 'once';
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
export declare function ensureOverlayId(o: OverlayData): string;
export declare function ensureComponentId(c: OverlayComponentData): string;
//# sourceMappingURL=types.d.ts.map