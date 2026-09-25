// Slab
import type { Slab } from '@/views/experiments/factory-arm/scene/grasp/slab';

// Constants
import { EDGES, GAP, LEVEL, TOUCH } from './constants';

/** Length two ranges share. */
const common = ([a0, a1]: [number, number], [b0, b1]: [number, number]) =>
  Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));

/**
 * The share of a case's sides that touch a pallet edge or a neighbour beside
 * it, from 0 to 1. Cases pressed into corners and against each other leave no
 * holes, so packing prefers the spots where this is highest.
 */
const contact = (slab: Slab, loaded: Slab[]) => {
  const beside = loaded.filter(
    (other) =>
      other.top > slab.bottom + LEVEL && other.bottom < slab.top - LEVEL
  );

  const side = (axis: 'x' | 'z', end: 0 | 1, wall: number) => {
    const cross = axis === 'x' ? 'z' : 'x';
    const edge = slab[axis][end];
    const length = slab[cross][1] - slab[cross][0];

    if (Math.abs(edge - wall) < TOUCH) {
      return length;
    }

    const touching = beside
      .filter((other) => Math.abs(other[axis][1 - end] - edge) < GAP + TOUCH)
      .reduce((sum, other) => sum + common(slab[cross], other[cross]), 0);

    return Math.min(length, touching);
  };

  const touched =
    side('x', 0, EDGES.x[0]) +
    side('x', 1, EDGES.x[1]) +
    side('z', 0, EDGES.z[0]) +
    side('z', 1, EDGES.z[1]);
  const perimeter = 2 * (slab.x[1] - slab.x[0] + (slab.z[1] - slab.z[0]));

  return touched / perimeter;
};

export { contact };
