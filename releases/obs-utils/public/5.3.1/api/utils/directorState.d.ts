export interface DirectorState {
    /** The user-configured tracking mode when combat is active. */
    trackingModeInCombat: string;
    /** The user-configured tracking mode out of combat. */
    trackingModeOutOfCombat: string;
    /** Whether a combat is currently active. */
    isInCombat: boolean;
    /** The currently-active tracking mode (in-combat or out-of-combat depending on state). */
    activeTrackingMode: string;
    /** User ID of the OBS-mode (focused) user, or null. */
    obsModeUserId: string | null;
}
export declare function getDirectorState(): DirectorState;
/**
 * Wire Foundry hooks that observe Director-state inputs (settings + combat) and
 * re-emit a unified `obs-utils.director.stateChanged` hook. Consumers can read
 * the new state from the hook payload or via `getDirectorState()`.
 */
export declare function initDirectorStateBridge(): void;
//# sourceMappingURL=directorState.d.ts.map