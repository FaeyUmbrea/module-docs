import type { Camera3D, CameraResult3D, CameraView3D } from './camera-3d.js';
import type { CameraFollow } from './follow.js';
import type { CameraAdapter, CameraPosition, MovementResult, MoveOptions } from './movement.js';
import type { CameraClaim, ConsumerOptions, RejectionReason } from './ownership.js';
import { CameraCoordinator } from './ownership.js';
export interface CameraSession extends CameraClaim {
    /** Replace this claim's current movement, continuing from the actual view. */
    retarget: (options: MoveOptions, signal?: AbortSignal) => Promise<MovementResult>;
    set3D: (view: CameraView3D) => CameraResult3D;
    move: (options: MoveOptions, signal?: AbortSignal) => Promise<MovementResult>;
}
export type SessionResult = {
    ok: true;
    claim: CameraSession;
} | {
    ok: false;
    reason: RejectionReason | 'unavailable';
};
export interface LocalConsumer {
    readonly id: string;
    follow: (source: () => MoveOptions | undefined, interval?: number) => {
        ok: true;
        follow: CameraFollow;
    } | {
        ok: false;
        reason: RejectionReason | 'unavailable';
    };
    /** Acquire, set the 3D view immediately, and release. */
    set3D: (view: CameraView3D) => CameraResult3D;
    acquire: () => SessionResult;
    /** Acquire, move, and release, including when movement fails. */
    move: (options: MoveOptions, signal?: AbortSignal) => Promise<MovementResult | {
        status: 'rejected';
        reason: RejectionReason;
    }>;
    unregister: () => void;
}
export declare class CameraController {
    #private;
    readonly adapter: CameraAdapter;
    readonly getUserId: () => string | undefined;
    readonly camera3D?: Camera3D | undefined;
    readonly ownership: CameraCoordinator;
    readonly consumers: Map<string, LocalConsumer>;
    constructor(adapter: CameraAdapter, getUserId: () => string | undefined, camera3D?: Camera3D | undefined);
    read(): Readonly<CameraPosition> | undefined;
    register(options: ConsumerOptions): LocalConsumer;
    releaseLocal(): void;
    panic(): void;
    resume(): void;
    reset(): void;
}
