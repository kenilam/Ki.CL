import { toVersionPath } from '@/Views/Experiments/TreeOfLife/Versions/constants';

import type { Vector3Tuple } from 'three';

/** The origin of life sits at the centre of the globe, and everything radiates from it. */
export const ORIGIN: Vector3Tuple = [0, 0, 0];

/**
 * Where the camera sits before anything has been placed.
 *
 * Only ever seen on an empty scene: nothing is drawn until the lineage reaches
 * the root, and `CameraRig` reframes the moment the first taxon publishes an
 * anchor. It just has to be a plausible standoff for a tree whose real extent
 * is not knowable in advance - that depends on how deep the lineage runs.
 */
export const OPENING_DISTANCE = 600;

/**
 * How far right of centre the focused taxon sits, as a fraction of the
 * viewport's shorter side.
 */
export const OFFSET_OF_VIEWPORT = 0.05;

/** Clearance the cage keeps beyond the furthest taxon it encloses. */
export const GLOBE_MARGIN = 1.3;

/** Strong green at the origin; every other colour is derived from it. */
export const ROOT_COLOR = '#1e8f57';

/**
 * The first branch out of the centre; later generations taper from here.
 *
 * Proportion is what makes this read as tissue rather than plumbing: a branch
 * is a vein, not a pipe, so it stays a small fraction of the body it feeds.
 * Stated as that fraction rather than as an absolute, because the relationship
 * is the part that matters - the tree's overall scale is emergent, set by how
 * deep the lineage runs, and a width pinned to a fixed reference drifts out of
 * proportion the moment that changes.
 */
export const TRUNK_SIZE = 3.6;
export const WIDTH_TO_SIZE = 0.161;
export const TRUNK_WIDTH = TRUNK_SIZE * WIDTH_TO_SIZE;

/**
 * Mirrors the taper `Taxon` applies to its own descendants, so a step along
 * the lineage thins at the same rate as a step out into a fan.
 */
export const WIDTH_TAPER = 0.72;
export const SIZE_TAPER = 0.78;

/**
 * Floors for the lineage.
 *
 * A taper compounds, and a real lineage runs seventy levels: unfloored, the
 * focused node came out at 5e-8 units - a millionth of a pixel - and because
 * branch length derives from size, the deep end collapsed onto a single point
 * as well. The taper decays *towards* these rather than through them, so the
 * tree still reads as thinning outward without the far end vanishing.
 *
 * Both share one fraction, which is what makes this dial safe to turn. Framing
 * distance is set by the branch length the floor implies, so lowering it pulls
 * the camera in by the same factor it shrinks the tree - a taxon occupies the
 * same ~11px on screen at any value. What the fraction actually decides is how
 * many generations of taper survive before the far end goes uniform (about 13
 * at a half, 17 at a quarter), and how large the tree is in world units.
 */
const FLOOR = 0.25;

export const MIN_WIDTH = TRUNK_WIDTH * FLOOR;
export const MIN_SIZE = TRUNK_SIZE * FLOOR;

/**
 * v15's own segment, and the path to a node within it.
 *
 * It is one version among the others now rather than the thing at the bare
 * path, so every link it builds has to say which version it belongs to.
 */
export const VERSION = '15';

export const toNodePath = (nodeId?: string | null): string =>
  toVersionPath({ version: VERSION, nodeId });
