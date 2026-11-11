export const RIPPLE_PERIOD_MS = 2600;
export const ORIGIN_PERIOD_MS = 5200;

/**
 * Ripple travel, as a multiple of the body's own radius. Bodies are barely two
 * units across, so a shorter ripple reads as a fat outline.
 */
export const RIPPLE_FROM = 1.4;
export const RIPPLE_TO = 6.2;
export const RIPPLE_PEAK_OPACITY = 0.95;

/**
 * How far the ripple is lifted toward white. In the body's own green it only
 * registered as motion.
 */
export const RIPPLE_WHITEN = 0.72;

/** The origin's breath is wider still - it marks a place, not an event. */
export const ORIGIN_RING_FROM = 2.1;
export const ORIGIN_RING_TO = 2.9;
export const ORIGIN_HALO_SCALE = 4.2;

/** Size of the painted falloff texture, in pixels. */
export const RESOLUTION = 128;
