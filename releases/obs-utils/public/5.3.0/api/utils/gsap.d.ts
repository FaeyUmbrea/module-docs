import type GSAPInstance from 'gsap';
declare const _default: typeof GSAPInstance;
export default _default;
/**
 * Cubic-bezier ease for arbitrary (x1,y1,x2,y2) control points. Returned function
 * has the shape GSAP accepts as a custom `ease`. Replaces `gsap/CustomEase`,
 * which Foundry does not bundle.
 *
 * Newton-Raphson root-find on the x-component to recover t for a given x, then
 * evaluate the y-component at that t. Eight iterations is overkill at 60fps but
 * costs nothing.
 */
export declare function cubicBezier(p1x: number, p1y: number, p2x: number, p2y: number): (t: number) => number;
//# sourceMappingURL=gsap.d.ts.map