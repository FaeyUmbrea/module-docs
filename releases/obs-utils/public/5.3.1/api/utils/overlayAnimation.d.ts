export type TransformAxis = 'x' | 'y' | 'rotation' | 'scaleX' | 'scaleY';
export type AnimatablePropertyKey = 'opacity' | 'x' | 'y' | 'rotation' | 'scaleX' | 'scaleY';
export declare const ANIMATABLE_PROPERTIES: AnimatablePropertyKey[];
export type EasingInterpolation = 'constant' | 'linear' | 'bezier';
export type EasingEquation = 'sinusoidal' | 'quadratic' | 'cubic' | 'quartic' | 'quintic' | 'exponential' | 'circular' | 'back' | 'bounce' | 'elastic';
export type EasingDirection = 'in' | 'out' | 'inout' | 'auto';
export interface EasingV2 {
    interpolation: EasingInterpolation;
    equation?: EasingEquation;
    direction?: EasingDirection;
}
export declare const DEFAULT_EASING_V2: EasingV2;
export declare const EQUATIONS: EasingEquation[];
export declare const EQUATION_LABELS: Record<EasingEquation, string>;
export declare const INTERP_LABELS: Record<EasingInterpolation, string>;
export declare const PROP_LABELS: Record<AnimatablePropertyKey, string>;
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
    type: 'static';
} | {
    type: 'looping';
} | {
    type: 'transition-on-end';
    toTrackId: string;
    toTime: number;
};
export type ZoneDestination = {
    type: 'goto';
    toTrackId: string;
    toTime: number;
} | {
    type: 'ignore';
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
export declare function makeEmptyTrack(id: string, name?: string): OverlayTrack;
export declare function makeEmptyAnimation(initialTrackId: string): OverlayAnimationData;
export declare function findActiveZone(transition: TrackTransition, playheadT: number): TransitionZone | undefined;
export declare function lanePropertyKeyframes(lane: TrackComponentLane): Record<AnimatablePropertyKey, PropertyKeyframe[]>;
export declare function ensurePropertyKeyframes(lane: TrackComponentLane): Required<TrackComponentLane>['propertyKeyframes'];
export declare function insertPropertyKeyframe(lane: TrackComponentLane, prop: AnimatablePropertyKey, kf: PropertyKeyframe): number;
export declare function removePropertyKeyframe(lane: TrackComponentLane, prop: AnimatablePropertyKey, index: number): void;
export declare function updatePropertyKeyframe(lane: TrackComponentLane, prop: AnimatablePropertyKey, index: number, patch: Partial<PropertyKeyframe>): number;
export declare function laneAggregateTimes(lane: TrackComponentLane): number[];
export declare function applyEasingV2(easing: EasingV2 | undefined, u: number): number;
export declare const PROP_DEFAULTS: Record<AnimatablePropertyKey, number>;
export declare function interpPropertyKeyframes(keyframes: PropertyKeyframe[], prop: AnimatablePropertyKey, t: number): number;
export declare function interpKeyframes(keyframes: TrackKeyframe[], t: number): {
    opacity: number;
    x: number;
    y: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
};
export declare function ensureLane(track: OverlayTrack, componentId: string): TrackComponentLane;
export declare function insertKeyframeOnLane(lane: TrackComponentLane, kf: TrackKeyframe): number;
export declare function removeKeyframeOnLane(lane: TrackComponentLane, index: number): void;
export declare function updateKeyframeOnLane(lane: TrackComponentLane, index: number, patch: Partial<TrackKeyframe>): number;
export declare function computeTrackFrame(track: OverlayTrack, playheadT: number): Map<string, {
    opacity: number;
    x: number;
    y: number;
    rotation: number;
    scaleX: number;
    scaleY: number;
}>;
//# sourceMappingURL=overlayAnimation.d.ts.map