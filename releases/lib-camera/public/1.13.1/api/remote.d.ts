import type { CameraResult3D, CameraView3D } from './camera-3d.js';
import type { CameraController } from './controller.js';
import type { CameraPosition, MovementResult, MoveOptions } from './movement.js';
import type { TrackingMode } from './viewport-filter.js';
export type RemoteOutcome = MovementResult | CameraResult3D | {
    status: 'rejected';
    reason: 'unauthorized' | 'wrong-scene' | 'unregistered';
};
export interface RemoteUserResult {
    userId: string;
    /** Acknowledgements from responding sessions; this is not proof that every session responded. */
    outcomes: RemoteOutcome[];
    status: 'acknowledged' | 'timeout' | 'cancelled' | 'offline' | 'rejected';
}
export interface RemoteOptions {
    timeout?: number;
    signal?: AbortSignal;
}
export interface ViewportSample {
    userId: string;
    sceneId: string;
    position: Readonly<CameraPosition>;
}
export interface ViewportSubscription {
    stop: () => void;
}
export interface RemoteEnvironment {
    userId: () => string | undefined;
    users: () => readonly {
        id: string;
        isGM: boolean;
        active: boolean;
    }[];
    sceneId: () => string | undefined;
    read: () => Readonly<CameraPosition> | undefined;
    emit: (packet: object, recipients: string[]) => void;
}
/** Foundry supplies sender identity as the second socket callback argument. Never read it from payloads. */
export declare class RemoteCamera {
    #private;
    readonly controller: CameraController;
    readonly environment: RemoteEnvironment;
    constructor(controller: CameraController, environment: RemoteEnvironment);
    move(consumer: string, targets: string | readonly string[], options: MoveOptions, remote?: RemoteOptions): Promise<RemoteUserResult[]>;
    set3D(consumer: string, targets: string | readonly string[], view: CameraView3D, remote?: RemoteOptions): Promise<RemoteUserResult[]>;
    watch(userId: string, callback: (sample: ViewportSample) => void, mode?: TrackingMode): ViewportSubscription;
    /** Follow the latest responding session of a user on this scene; all sessions remain addressable together. */
    followUser(consumerId: string, userId: string, options?: Pick<MoveOptions, 'duration' | 'easing' | 'bounds' | 'lockInput'>, mode?: TrackingMode): {
        ok: true;
        follow: import("./follow.js").CameraFollow;
    } | {
        ok: false;
        reason: import("./ownership.js").RejectionReason | "unavailable";
    };
    /** Bound socket traffic to approximately 30 Hz, retaining the newest sample. */
    publish(): void;
    receive(packet: unknown, sender: unknown): Promise<void>;
    dispose(): void;
}
