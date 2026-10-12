import type { CameraBounds } from './framing.js';
import type { CameraClaim, ReleaseReason } from './ownership.js';
export interface CameraPosition {
    x: number;
    y: number;
    scale: number;
    level?: string;
}
export interface MoveOptions extends Partial<CameraPosition> {
    /** Milliseconds; zero applies the view immediately. Maximum: one minute. */
    duration?: number;
    easing?: 'linear' | 'cosine' | 'easeInCircle' | 'easeOutCircle' | 'easeInOutCircle' | 'easeInCosine' | 'easeOutCosine' | 'easeInOutCosine' | 'easeOutCubic' | 'easeInOutCubic';
    /** true constrains to scene bounds; a rectangle constrains to that region. */
    bounds?: true | CameraBounds;
    /** Suppress manual camera input only for this operation. */
    lockInput?: boolean;
}
export type MovementResult = {
    status: 'completed';
    position: Readonly<CameraPosition>;
} | {
    status: 'cancelled';
    reason: ReleaseReason | 'cancelled' | 'interrupted' | 'retargeted';
} | {
    status: 'rejected';
    reason: 'invalid-input' | 'inactive-claim' | 'busy' | 'unavailable';
} | {
    status: 'failed';
    reason: 'adapter-error';
};
/** Boundary to Foundry. Adapters must stop writing synchronously when aborted. */
export interface CameraAdapter {
    read: () => Readonly<CameraPosition> | undefined;
    pan: (position: CameraPosition) => void;
    animate: (position: CameraPosition, options: Required<Pick<MoveOptions, 'duration' | 'easing'>>, signal: AbortSignal) => Promise<boolean>;
    lockInput: () => () => void;
    prepare?: (options: MoveOptions, signal: AbortSignal) => Promise<boolean>;
    constrain?: (position: CameraPosition, bounds: NonNullable<MoveOptions['bounds']>) => CameraPosition;
}
export declare function validMove(options: MoveOptions): boolean;
/** One operation per claim. Cancellation never releases a caller's longer-lived claim. */
export declare class CameraMovement {
    #private;
    readonly adapter: CameraAdapter;
    constructor(adapter: CameraAdapter);
    move(claim: CameraClaim, options: MoveOptions, signal?: AbortSignal): Promise<MovementResult>;
}
