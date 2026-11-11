// Constants
import {
  ORIGIN,
  ROOT_COLOR,
  TRUNK_SIZE,
  TRUNK_WIDTH,
  WIDTH_TAPER,
} from '@/views/experiments/tree-of-life/explorer/constants';

// Spec
import type * as Spec from './spec';

/** Where along the growth the body starts swelling out of the tip. */
export const BODY_AT = 0.55;

/**
 * How many descendants a taxon shows when it is not the one being looked at,
 * spread evenly across the list. A context node with a hundred children would
 * bury the lineage.
 */
export const CONTEXT_DESCENDANTS = 6;

/**
 * How much of a clade mounts in one frame, as a fraction of its size, and the
 * smallest useful slice. Bacteria mounts about 1,800 taxa, measured at 1,009ms
 * of blocked frames in one go; proportional slices keep it to a handful of
 * frames whatever the size.
 */
export const MOUNT_FRACTION = 0.04;
export const MOUNT_MINIMUM = 3;

/**
 * Close to critically damped, so a link settles in roughly 190ms. The lineage
 * advances one link per settle, so this paces the whole unfurling.
 * `friction ≈ 2 * sqrt(tension)` keeps a growing branch from wobbling.
 */
export const SPRING = {
  tension: 600,
  friction: 49,
  precision: 0.002,
};

/**
 * Taper one step, toward a floor rather than through it. A bare multiply over
 * seventy generations shrinks a body to nothing; decaying toward a floor reads
 * the same at the top and flattens out smoothly.
 */
export const decay = (value: number, taper: number, floor: number): number => {
  return floor + (value - floor) * taper;
};

export const ROOT: Spec.Growth = {
  start: ORIGIN,
  startColor: ROOT_COLOR,
  startWidth: TRUNK_WIDTH,
  endWidth: TRUNK_WIDTH * WIDTH_TAPER,
  size: TRUNK_SIZE,
  play: 'enter',
  withinFocus: false,
};
