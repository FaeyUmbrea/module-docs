import type { CameraClaim, RejectionReason } from './ownership.js';
/** Native 3D Canvas units: X/Z span the scene; Y is elevation. */
export interface Vector3D {
    x: number;
    y: number;
    z: number;
}
export interface CameraView3D {
    position: Readonly<Vector3D>;
    target: Readonly<Vector3D>;
}
export type CameraResult3D = {
    status: 'completed';
    view: Readonly<CameraView3D>;
} | {
    status: 'rejected';
    reason: RejectionReason | 'invalid-input' | 'inactive-claim' | 'unavailable' | 'unsupported-mode';
} | {
    status: 'failed';
    reason: 'adapter-error';
};
interface MutableVector extends Vector3D {
    set: (x: number, y: number, z: number) => unknown;
}
/** Shared exposed surface of 3D Canvas 8 (Foundry 13) and 9 (Foundry 14). */
export interface Canvas3D {
    _active: boolean;
    _ready: boolean;
    firstPersonMode: boolean;
    _toggleCameraLockPosition?: unknown;
    GameCamera: {
        enabled: boolean;
    };
    cutsceneEngine: {
        isPlaying: boolean;
    };
    camera: {
        position: MutableVector;
    };
    controls: {
        target: MutableVector;
        enableDamping: boolean;
        autoRotate: boolean;
        update: () => unknown;
    };
    stopCameraAnimation: () => void;
}
export declare function validView3D(view: CameraView3D): boolean;
export declare class Camera3D {
    readonly getCanvas: () => Canvas3D | undefined;
    constructor(getCanvas: () => Canvas3D | undefined);
    read(): Readonly<CameraView3D> | undefined;
    availability(): 'unavailable' | 'unsupported-mode' | undefined;
    /**
     * Immediate write through native orbit controls, which may constrain the result.
     * Free-camera collision handling can later reproject the target along the viewing ray.
     * Preserves camera mode and control settings; does not hold the view against manual input.
     */
    set(claim: CameraClaim, next: CameraView3D): CameraResult3D;
}
export {};
