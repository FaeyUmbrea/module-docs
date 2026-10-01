export declare const MODULE_ID = "obs-utils";
export interface StringMap {
    [key: string]: string;
}
export declare const ICCHOICES: StringMap;
export declare const OOCCHOICES: StringMap;
export declare const NAME_TO_ICON: StringMap;
/**
 * How the OBS client decides which floor to stand on, for the modes that have
 * no inherent answer — the multi-token modes and birdseye.
 *
 * Clone modes are absent because they mirror a specific user, whose floor
 * arrives with their viewport. `trackone`/`trackToken` are absent because a
 * single token answers it outright.
 */
export declare const LEVEL_POLICY_CHOICES: StringMap;
/** Which floor to take when the tracked group is spread over several. */
export declare const LEVEL_RELATIVE_CHOICES: StringMap;
//# sourceMappingURL=const.d.ts.map