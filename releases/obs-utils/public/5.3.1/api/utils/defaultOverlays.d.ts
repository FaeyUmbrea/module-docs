import { OverlayData } from './types.ts';
export declare function getExampleOverlay(): OverlayData;
export interface LegacyRollOverlayConfig {
    preRollEnabled?: boolean;
    postRollEnabled?: boolean;
    preRollDelay?: number;
    preRollFadeIn?: number;
    preRollFadeOut?: number;
    preRollStay?: number;
    rollFadeIn?: number;
    rollFadeOut?: number;
    rollStay?: number;
    postRollFadeIn?: number;
    postRollFadeOut?: number;
    postRollStay?: number;
    preRollImage?: string;
    rollBackground?: string;
    rollForeground?: string;
    postRollImage?: string;
}
export declare function makeRollOverlayFromLegacyConfig(c: LegacyRollOverlayConfig): OverlayData;
export declare function registerStarter(overlays: OverlayData[]): void;
export declare function readStarterOverlays(): OverlayData[];
//# sourceMappingURL=defaultOverlays.d.ts.map