export type EasingKind = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'power1.in' | 'power1.out' | 'power1.inOut' | 'power2.in' | 'power2.out' | 'power2.inOut' | 'power3.in' | 'power3.out' | 'power3.inOut' | 'sine.in' | 'sine.out' | 'sine.inOut' | 'back.in' | 'back.out' | 'back.inOut' | {
    cubicBezier: [number, number, number, number];
};
export type LoopMode = 'none' | 'restart' | 'pingpong';
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
/** Map our EasingKind values to GSAP ease strings / functions. */
export declare function toGsapEase(easing: EasingKind): string | gsap.EaseFunction;
/**
 * Read the camera presets stored on a scene's `flags['obs-utils'].cameraPresets`
 * flag. The flag is a JSON string wrapping a versioned object so the schema can
 * evolve without breaking existing worlds.
 *
 * Defensive: returns `[]` if the flag is missing, malformed, or carries a
 * future/unknown version.
 */
export declare function readPresets(scene: any): CameraPreset[];
/** Persist the preset list back to the scene flag. Stringifies the versioned wrapper. */
export declare function writePresets(scene: any, presets: CameraPreset[]): Promise<void>;
/** Build a fresh preset from a captured viewport with a numbered default name. */
export declare function makePreset(viewport: {
    x: number;
    y: number;
    scale: number;
}, index: number): CameraPreset;
//# sourceMappingURL=cameraPresets.d.ts.map