import type { OBSRemoteEventTypeRegistration } from './api.ts';
import type { CustomEventInstance } from './types.ts';
import OBSWebSocket from 'obs-websocket-js';
/**
 * Run every configured instance of a registered OBS Remote event type whose
 * matcher passes the runtime context. Only executes on the OBS client — the
 * GM client receives the same call but exits early.
 */
export declare function triggerCustomEventInstances(reg: OBSRemoteEventTypeRegistration, instances: CustomEventInstance[], context: Record<string, any>): Promise<void>;
export declare function getWebsocket(): Promise<OBSWebSocket>;
export declare function initOBS(): void;
//# sourceMappingURL=obs.d.ts.map