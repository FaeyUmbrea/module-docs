import type { CameraPreset } from './cameraPresets.ts';
import type { OBSWebsocketSettings } from './types.ts';
export type NotificationType = 'info' | 'warning' | 'error' | 'success';
export declare function proxyNotification(message: string, type?: string, options?: NotificationOptions): void;
export declare function sendOpenSettingsConfig(): void;
export declare function sendOBSSetting(user: string, settings: OBSWebsocketSettings | undefined): void;
export declare function activateViewportTracking(): void;
export declare function deactivateViewportTracking(): void;
/**
 * Emit this client's current viewport once, outside the pan-driven pipeline.
 *
 * Two callers: our own `canvasReady`, so a client that joins and never touches
 * the camera still announces itself, and `requestViewport`, so an OBS client
 * that reloads can repopulate its list without waiting for someone to pan.
 */
export declare function emitViewportNow(): void;
/** Broadcast asking every client to announce its viewport. Sent by the OBS client. */
export declare function sendRequestViewport(): void;
export declare function socketCanvas(_canvas: Canvas, position: Canvas.ViewPosition): void;
/**
 * Called from `canvasReady`. A redraw is the only thing that changes our level,
 * so this is where a floor change becomes visible to other clients.
 *
 * The buffered positions are all pre-change, and averaging across a floor change
 * produces a coordinate meaningless on either floor — so the smoothing window is
 * discarded rather than carried over. Same discontinuity handling `SMOOTH_JUMP_PX`
 * already does for programmatic pans, just triggered by a redraw instead.
 */
export declare function onCanvasReadyEmit(): void;
/** Claimant invokes this. Asks the named GM to grant control. */
export declare function requestGMHandover(fromUserId: string): void;
export declare function broadcastPlayPreset(preset: CameraPreset): void;
export declare function broadcastStopPreset(): void;
/**
 * Orchestrate a preset play. Called by the DM that clicked. Side-effects, all
 * sticky (never restored after the preset finishes):
 *   1. Switches both `defaultInCombat` and `defaultOutOfCombat` to `cloneDM`,
 *      since a preset is an explicit "follow me" gesture and the operator
 *      shouldn't have to redo the choice when combat starts or ends.
 *   2. Claims `activeGMUserId` so this DM owns the broadcast camera.
 *   3. Pauses the DM's outgoing viewport stream. This stays on; the operator
 *      flips it off manually once they want live tracking back.
 *   4. Broadcasts the preset; OBS clients run it locally.
 */
export declare function orchestratePresetPlay(preset: CameraPreset): Promise<void>;
//# sourceMappingURL=socket.d.ts.map