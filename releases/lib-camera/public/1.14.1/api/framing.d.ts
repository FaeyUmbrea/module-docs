import type { CameraPosition } from './movement.js';
export interface CameraBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface FrameOptions {
    /** Margin on each side, expressed in grid tiles. */
    margin?: number;
    /** Minimum and maximum number of horizontal grid tiles visible. */
    closest?: number;
    widest?: number;
}
export interface ViewDimensions {
    width: number;
    height: number;
    gridSize: number;
}
/** Shared with OBS Utils: more visible tiles means a smaller scale. */
export declare function tilesToScale(tiles: number, screenWidth: number, gridSize: number): number;
export declare function validBounds(bounds: CameraBounds): boolean;
/** OBS Utils framing, with explicit inputs instead of world settings. */
export declare function frameBounds(bounds: readonly CameraBounds[], screen: ViewDimensions, options?: FrameOptions): CameraPosition | undefined;
/** Keep the viewport inside a rectangle, increasing scale when necessary (OBS Utils). */
export declare function clampView(position: CameraPosition, bounds: CameraBounds, screen: ViewDimensions): CameraPosition;
