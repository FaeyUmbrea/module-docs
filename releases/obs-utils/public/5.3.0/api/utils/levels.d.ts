interface LevelLike {
    id: string;
    sort: number;
    elevation?: {
        bottom?: number;
    };
}
/** The floor this client is displaying, or undefined where Scene Levels doesn't exist. */
export declare function getCurrentLevelId(): string | undefined;
/** False on v13, and on any v14 scene that has no levels configured. */
export declare function sceneHasLevels(): boolean;
/** A token's floor, or undefined on v13. */
export declare function getTokenLevelId(token: Token | undefined): string | undefined;
/**
 * Scene floors ordered bottom to top.
 *
 * By `elevation.bottom`, with `sort` only as a tiebreaker. `Scene#prepareEmbeddedDocuments`
 * defines `levels.sorted` as `a.sort - b.sort`, but on real scenes `sort` is
 * routinely 0 on every floor — it is on all four of The Restored Keep's — so
 * that comparator returns 0 for every pair and core's order survives purely
 * because `Array#sort` is stable and insertion order happened to be right.
 * Elevation is the field that actually carries the vertical relationship
 * (-20 / 0 / 20 / 40 on that scene), and "highest occupied floor" is meaningless
 * without it.
 */
export declare function getSortedLevels(): LevelLike[];
/**
 * Can this client legally display the given floor?
 *
 * Core admits a non-GM to exactly those floors holding a token they can
 * observe. Computed here rather than read off `Scene#availableLevels`, which is
 * memoised and invalidated only in `prepareEmbeddedDocuments` — it can be stale
 * precisely while the party is moving between floors.
 */
export declare function canUserViewLevel(user: User | undefined, levelId: string): boolean;
export declare function canViewLevel(levelId: string): boolean;
/**
 * Move this client to `levelId` if it isn't already there.
 *
 * Returns false when the floor is unreachable, so the caller can hold its last
 * good frame. Panning to a correct coordinate on a floor the stream isn't
 * showing is a wrong frame, not a graceful degradation.
 */
export declare function applyLevel(levelId: string | undefined): Promise<boolean>;
export interface ScenePins {
    level?: string;
    levelToken?: string;
    trackedToken?: string;
}
export declare function getScenePins(sceneId?: string): ScenePins;
/** Merge a change into the current scene's pins, leaving every other scene's alone. */
export declare function setScenePin(patch: Partial<ScenePins>, sceneId?: string): Promise<void>;
/** Tokens on the active scene, for the Director's pickers. */
export declare function getSceneTokenChoices(): {
    id: string;
    name: string;
    level?: string;
}[];
/** Floors of the active scene, bottom to top, for the Director's pickers. */
export declare function getLevelChoices(): {
    id: string;
    name: string;
}[];
/**
 * Resolve which floor the camera should stand on for a tracked group.
 *
 * Only consulted by the modes with no inherent answer — the multi-token modes
 * and birdseye. Returns undefined to mean "no opinion", which leaves the client
 * on whatever floor it is already displaying.
 */
export declare function resolveLevelForTokens(tokens: Token[]): string | undefined;
/** Drop tokens that aren't on the chosen floor, so the bounding box can't straddle. */
export declare function tokensOnLevel(tokens: Token[], levelId: string | undefined): Token[];
export {};
//# sourceMappingURL=levels.d.ts.map