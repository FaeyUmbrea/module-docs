import type { ObsUtilsApi } from './api.ts';
export declare function sleep(milliseconds: number | undefined): Promise<unknown>;
export declare function isOBS(): boolean;
export declare function isManualOBS(): ClientSettings.SettingInitializedType<"core", ClientSettings.KeyFor<"core">> | undefined;
export declare function removeBG(): void;
export declare function getGM(): User | undefined;
/** All users with GM permission (online or offline). */
export declare function getAllGMs(): User[];
/**
 * Resolve the GM whose viewport should drive `cloneDM`-mode camera tracking.
 * Honors the `activeGMUserId` setting when that user is online; otherwise
 * falls back to the first active GM (legacy behavior).
 */
export declare function getActiveGM(): User | undefined;
export interface ActorValue {
    value: string;
    label: string;
    $created?: boolean;
}
export type ActorValues = ActorValue[];
/**
 * Grouped variant — system modules can ship a richer hierarchical layout via
 * `api.setAVDataGrouped`. Picker components consume the grouped form via
 * `getActorValueGroups` and pass it straight to the picker. Flat data set via
 * legacy `setAVData` is wrapped in a single anonymous group, so the picker only
 * has one code path.
 */
export interface ActorValueGroup {
    /** i18n key for the group label. Resolved at set time. */
    label: string;
    /** Lower numbers sort earlier in the picker. Defaults to 100. */
    order?: number;
    items: ActorValue[];
}
export declare function getActorValues(): ActorValues;
/** Returns the grouped layout for picker UIs. Lazy-initializes the same way as `getActorValues`. */
export declare function getActorValueGroups(): ActorValueGroup[];
/**
 * Return data-picker groups that include both actor paths and trigger payload
 * paths. Trigger paths are sourced from the public trigger registry; for the
 * common payload shapes (`Actor`, `Roll`, `ChatMessage`) we surface the
 * useful nested fields so users don't have to type them by hand. Custom
 * nested paths can still be typed directly into the picker.
 *
 * Use in editors whose `data` field may legitimately reference event payloads
 * (Text, Icon, Image — i.e. anywhere `trigger.*` makes sense).
 */
export declare function getDataPickerGroups(): ActorValueGroup[];
export declare function setActorValues(actorValueArray: ActorValues): void;
/**
 * Return a new groups array that's guaranteed to include `path` as a selectable
 * option. If `path` is already represented, returns the input unchanged.
 * Otherwise appends a "Custom" group (or extends an existing one). Picker UIs
 * use this so a user-typed actor path remains shown in the dropdown.
 */
export declare function ensureCustomValue(groups: ActorValueGroup[], path: string | null | undefined): ActorValueGroup[];
/**
 * Install a grouped AV layout. Group labels are localized once at set time.
 * Last writer wins — same semantics as `setActorValues`.
 */
export declare function setActorValuesGrouped(groups: ActorValueGroup[]): void;
export declare function getApi(): ObsUtilsApi;
export declare function removeQuotes(s: string): string;
/**
 * Resolve a value from an object by a dot/bracket path.
 * Supports array indices like [0] and for Maps/Objects treats [n] as the nth entry when keys are sorted alphabetically.
 * Returns '' if any step cannot be resolved.
 */
export declare function getByDataPath(obj: unknown, path: string | undefined | null): unknown;
/**
 * Like getByDataPath, but paths prefixed with `trigger.` are resolved against
 * the event payload instead of the actor. Returns '' if the payload is absent
 * or the path cannot be resolved.
 */
export declare function getByTriggerOrDataPath(actor: unknown, payload: Record<string, any> | undefined, path: string | undefined | null): unknown;
/**
 * Minimal debounce implementation with optional maxWait.
 */
export declare function debounce<F extends (...args: any[]) => void>(fn: F, wait?: number, options?: {
    maxWait?: number;
}): F;
export declare function preventUndefinedNullInArray(array: any | null | undefined[]): any[];
//# sourceMappingURL=helpers.d.ts.map