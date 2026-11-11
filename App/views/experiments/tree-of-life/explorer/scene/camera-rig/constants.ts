import { THREE } from '@/three';

/** How long to keep waiting for a tree that never finishes, in seconds. */
export const GRACE = 1.5;

/** Frames the lineage has to stay anchored before the camera commits. */
export const STABLE_FRAMES = 2;

/** Framing radius when the ancestor never anchors, as a fraction of extent. */
export const FALLBACK_REACH = 0.05;

/** Breathing room around the framed pair. */
export const PADDING = 1.6;

/** Never end up inside the geometry when the ancestor sits very close. */
export const MIN_RADIUS = 4;

/**
 * How far off the lineage axis the camera sits at the near end, in radians.
 * Looking straight down the branch flattens the clade into a rosette.
 */
export const TILT = Math.PI / 4.5;

/** Breathing room left around the tree at the furthest zoom, in `rem`. */
export const VIEW_MARGIN_REM = 4;

/** Clearance kept beyond the furthest thing in the scene, and the near:far cap. */
export const FRUSTUM_MARGIN = 1.25;
export const DEPTH_RATIO = 20000;

/** The up-vector at the near end of the zoom. */
export const WORLD_UP = new THREE.Vector3(0, 1, 0);

/**
 * How much of the range one wheel notch covers, and how fast the camera
 * catches up. A notch is `deltaY: 100`, so the whole sweep is about thirty
 * notches; any brisker and one flick crosses from a taxon to its whole
 * ancestry.
 */
export const WHEEL_SENSITIVITY = 0.00035;
export const ZOOM_EASE = 7;

/** How fast the camera flies from one taxon to the next, per second. */
export const TRAVEL_EASE = 3.2;

/**
 * Frames to hold after a framing before the tree is told the camera has
 * arrived. Only matters on a cold load, which has no flight: without it the
 * clade mounts on the same frame as the tree.
 */
export const SETTLE_FRAMES = 6;

/** Radians of orbit per pixel dragged. */
export const DRAG_SENSITIVITY = 0.005;

/**
 * How close the camera may get to either pole of the pose's up-vector.
 * Looking straight along `up` leaves `lookAt` no way to pick the horizon, so
 * the view rolls over.
 */
export const TILT_LIMIT = 0.25;

/** How far the composition is rolled at full pull-back, onto the diagonal. */
export const ROLL = -Math.PI / 4;

/**
 * How far the far bearing leans toward the origin end of the lineage, so the
 * origin sits nearest the lens instead of buried in its own tree.
 */
export const LEAN = Math.PI / 7;
