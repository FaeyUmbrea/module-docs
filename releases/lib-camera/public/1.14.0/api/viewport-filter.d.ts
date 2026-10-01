import type { ViewportSample } from './remote.js';
export type TrackingMode = 'raw' | 'smooth' | 'dragRelease';
/** OBS Utils' five-sample smoothing and drag-release behavior, scoped to one subscription. */
export declare class ViewportFilter {
    #private;
    readonly mode: TrackingMode;
    readonly callback: (sample: ViewportSample) => void;
    constructor(mode: TrackingMode, callback: (sample: ViewportSample) => void);
    push(sample: ViewportSample): void;
    dispose(): void;
}
