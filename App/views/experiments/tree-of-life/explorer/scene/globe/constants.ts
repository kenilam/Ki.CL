/** How quickly the cage catches up, per second. */
export const EASE = 1.4;

/** Earth's axial tilt, for no better reason than that it looks right. */
export const AXIAL_TILT = (23.44 * Math.PI) / 180;

/** Radians per second - one turn takes a little over five minutes. */
export const SPIN = 0.005;

/** How opaque the wireframe is when the view is close in. */
export const OPACITY = 0.28;

/**
 * Where in the pull-back the cage starts giving way, and where it is gone.
 * All the way out the camera is inside it, and it would cover the lineage.
 */
export const FADE_FROM = 0.55;
export const FADE_TO = 0.95;

/** How faint the cage may get; it still gives the far end a sense of volume. */
export const MIN_OPACITY = 0.05;

/**
 * Defocus, faked with a shell just inside and outside the crisp one. A
 * wireframe is one-pixel GL lines, so a real blur would need a
 * post-processing pass. The spread opens with the zoom.
 */
export const BLUR_SHELLS = [-1, 1];
export const BLUR_SPREAD = 0.016;

/**
 * Share of the cage's opacity each shell takes from the crisp one, so the
 * blur spreads the same ink instead of adding more.
 */
export const BLUR_SHARE = 0.3;
