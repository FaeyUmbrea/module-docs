import type { CameraSession } from './controller.js';
import type { MovementResult, MoveOptions } from './movement.js';
export interface CameraFollow {
    readonly active: boolean;
    readonly paused: boolean;
    /** Resolves on stop, preemption, panic, teardown or a source/movement failure. */
    readonly done: Promise<MovementResult>;
    pause: () => void;
    resume: () => void;
    stop: () => void;
}
/** Sample a consumer-selected source; tracking policy remains with the consumer. */
export declare function followCamera(session: CameraSession, source: () => MoveOptions | undefined, interval?: number): CameraFollow;
