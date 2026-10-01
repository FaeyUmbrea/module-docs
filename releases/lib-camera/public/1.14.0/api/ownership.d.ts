/** Why a live claim ended. Movement adapters must observe the claim signal. */
export type ReleaseReason = 'released' | 'superseded' | 'unregistered' | 'panic' | 'canvas-teardown' | 'disposed';
export type RejectionReason = 'disabled' | 'unregistered' | 'busy' | 'disposed' | 'canvas-teardown';
export interface ConsumerOptions {
    /** Module ID. Registration is coordination, not an authorization boundary. */
    id: string;
    name: string;
    priority?: number;
}
export interface ClaimSnapshot {
    readonly consumerId: string;
    readonly userId: string;
    readonly priority: number;
}
export interface CameraClaim {
    readonly consumerId: string;
    readonly userId: string;
    readonly active: boolean;
    /** Aborted exactly once. signal.reason is a ReleaseReason. */
    readonly signal: AbortSignal;
    /** A stale claim cannot release a newer claim. */
    release: () => void;
}
export type ClaimResult = {
    readonly ok: true;
    readonly claim: CameraClaim;
} | {
    readonly ok: false;
    readonly reason: RejectionReason;
    readonly owner?: ClaimSnapshot;
};
export interface CameraConsumer {
    readonly id: string;
    /** An existing claim is never silently replaced by another from the same consumer. */
    acquire: (userId: string) => ClaimResult;
    unregister: () => void;
}
export interface PriorityOverride {
    consumerId: string;
    /** Omit for a default applying to all users. */
    userId?: string;
    priority: number;
}
export interface ConsumerSnapshot {
    readonly id: string;
    readonly name: string;
    readonly priority: number;
}
export interface Diagnostic {
    readonly sequence: number;
    readonly action: 'acquired' | 'rejected' | 'ended';
    readonly consumerId: string;
    readonly userId: string;
    readonly reason?: ReleaseReason | RejectionReason;
}
/**
 * Per-user ownership arbitration for cooperative camera consumers.
 * The integration layer authenticates remote requests and enforces input locks.
 */
export declare class CameraCoordinator {
    #private;
    constructor({ diagnosticLimit }?: {
        diagnosticLimit?: number;
    });
    register({ id, name, priority }: ConsumerOptions): CameraConsumer;
    /** Replace configuration atomically. New priorities apply to the next acquisition. */
    setPriorities(overrides: readonly PriorityOverride[]): void;
    getConsumers(userId?: string): readonly ConsumerSnapshot[];
    getOwner(userId: string): ClaimSnapshot | undefined;
    getClaims(): readonly ClaimSnapshot[];
    getDiagnostics(): readonly Diagnostic[];
    isDisabled(userId?: string): boolean;
    /** Stop and block one user, or every user when omitted. Resume is explicit. */
    panic(userId?: string): void;
    /** Global resume preserves individual users' opt-outs. */
    resume(userId?: string): void;
    /** Release transient claims on a canvas transition; retain user configuration. */
    reset(): void;
    dispose(): void;
}
