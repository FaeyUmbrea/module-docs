/**
 * A tracked user's camera position, plus the floor they were standing on.
 *
 * `level` rides the same payload as the position rather than travelling on its
 * own event so a floor change and the camera position that belongs to it are
 * applied as one decision. Split across two messages they race the receiver's
 * redraw and produce a visibly wrong frame. It is `undefined` on v13, where
 * Scene Levels does not exist.
 */
export interface ViewportPayload {
    x: number;
    y: number;
    scale: number;
    level?: string;
}
export declare const VIEWPORT_DATA: Map<string, ViewportPayload>;
export declare function hideApplication(_: unknown, html: JQuery | HTMLElement): void;
export declare function hideSceneControls(_: unknown, html: JQuery | HTMLElement): void;
export declare function hideNotifications(): void;
export declare function hideTokenBorder(token: Token | undefined): void;
/** Flip a token's manual tracking flag. Returns the new state so callers can report it. */
export declare function toggleToken(tokenDocument: TokenDocument): boolean;
export declare function getCurrentUser(): string | null;
/**
 * Convert a horizontal tile count into a canvas scale.
 *
 * More tiles visible is a *smaller* scale. This function is the only place that
 * inversion has to be reasoned about — every caller and every setting reads in
 * tiles, so `Closest View` being a `Math.min` on scale is correct even though it
 * looks backwards at the call site.
 */
export declare function tilesToScale(tiles: number, screenWidth: number, gridSize: number): number;
export declare function tokenMoved(): void;
export declare function viewportChanged(userId: string): void;
export declare function isGM(): boolean;
export declare function expandTokenHud(_tokenHud: TokenHUD, html: HTMLElement, token: TokenDocument): void;
export declare function scaleToFit(): void;
export declare function closePopupWithDelay(popout: {
    close: () => void;
}): Promise<void>;
export declare function applyPopupConstrains(popout: {
    setPosition: (position: {
        left: number;
        top: number;
        width: number;
        height: number;
    }) => void;
}): Promise<void>;
export declare function showTracker(): Promise<void>;
export declare function hideSidebar(): Promise<void>;
export declare function screenReload(): Promise<void>;
/** Public wrapper around clampAndApply for use by the multi-GM handover. */
export declare function clampAndApplyExternal(canvasPos: {
    x: number;
    y: number;
    scale: number;
}): void;
/** Read the local canvas viewport (current pan + zoom). */
export declare function getLocalViewport(): {
    x: number;
    y: number;
    scale: number;
} | null;
//# sourceMappingURL=canvas.d.ts.map