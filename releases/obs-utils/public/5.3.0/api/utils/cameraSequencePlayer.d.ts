import type { CameraPreset } from './cameraPresets.ts';
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
/**
 * Build a GSAP Timeline from a keyframed preset, advancing a viewport proxy
 * through each keyframe with the segment's easing applied. Calls
 * clampAndApplyExternal on every onUpdate tick.
 *
 * If keyframes is missing or empty, applies the single-waypoint immediately
 * and returns a no-op controller.
 */
export declare function playSequence(preset: CameraPreset): SequenceController;
//# sourceMappingURL=cameraSequencePlayer.d.ts.map