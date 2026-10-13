import type { Readable, Writable } from 'svelte/store';
export declare const OBSAction: {
    SwitchScene: string;
    ToggleSource: string;
    EnableSource: string;
    DisableSource: string;
};
export declare const SETTINGS_VERSION = 4;
export declare const OBS_MODIFIABLE_SETTINGS: Set<never>;
export declare function runMigrations(): Promise<void>;
export declare function getSetting<K extends ClientSettings.KeyFor<'obs-utils'>>(settingName: K): ClientSettings.SettingInitializedType<'obs-utils', K> | undefined;
export declare function setSetting<K extends ClientSettings.KeyFor<'obs-utils'>>(settingName: K, value: ClientSettings.SettingCreateData<'obs-utils', K>): Promise<void>;
interface ButtonData {
    icon: string;
    tooltip: string;
    id: string;
}
export declare function generateDataBlockFromSetting(): {
    ic: ButtonData[];
    ooc: ButtonData[];
    players: User[];
    onlineUsers: User[];
};
/**
 * Get a readable store for a setting key, if it exists.
 */
export declare function getReadableStore<T = any>(key: ClientSettings.KeyFor<'obs-utils'>): Readable<T> | undefined;
/**
 * Get a writable store for a setting key, if it exists.
 */
export declare function getStore<K extends ClientSettings.KeyFor<'obs-utils'>, T = ClientSettings.SettingInitializedType<'obs-utils', K>>(key: K): Writable<T>;
/**
 * Internal: ensure a store exists for key, initialized from game settings.
 * Also wires two-way sync between the store and Foundry settings.
 */
export declare function ensureStore<T = any>(key: ClientSettings.KeyFor<'obs-utils'>): Writable<T>;
export declare const settings: {
    getSetting: typeof getSetting;
    setSetting: typeof setSetting;
    getStore: typeof getStore;
    getReadableStore: typeof getReadableStore;
};
export {};
//# sourceMappingURL=settings.d.ts.map