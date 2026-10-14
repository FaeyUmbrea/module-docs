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
/** Native 3D view from a responding user on a particular scene. */
export interface ViewportSample3D {
    userId: string;
    sceneId: string;
    view: Readonly<CameraView3D> | null;
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
    read3D?: () => Readonly<CameraView3D> | undefined;
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
    /** Subscribe to native 3D samples; sender identity is checked before delivering each sample. */
    watch3D(userId: string, callback: (sample: ViewportSample3D) => void): ViewportSubscription;
    /** Acquire a camera claim and copy a user's native 3D samples until stopped or preempted. */
    followUser3D(consumerId: string, userId: string): {
        ok: false;
        reason: import("./ownership.js").RejectionReason | "unavailable";
    } | {
        ok: true;
        follow: import("./follow.js").CameraFollow;
    };
    /** Follow the most recently changed viewport among the consumer-selected users on this scene. */
    followUser(consumerId: string, userId: string | readonly string[], options?: Pick<MoveOptions, 'duration' | 'easing' | 'bounds' | 'lockInput'>, mode?: TrackingMode): {
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
