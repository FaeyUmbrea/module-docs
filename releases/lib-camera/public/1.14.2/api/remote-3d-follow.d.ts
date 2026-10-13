import type { CameraSession } from './controller.js';
import type { CameraFollow } from './follow.js';
import type { ViewportSample3D, ViewportSubscription } from './remote.js';
/** Copy native 3D samples from the current scene, releasing the claim and subscription on stop. */
export declare function followRemote3D(session: CameraSession, subscribe: (callback: (sample: ViewportSample3D) => void) => ViewportSubscription, sceneId: () => string | undefined): CameraFollow;
