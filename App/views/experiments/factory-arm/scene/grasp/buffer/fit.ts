// Spec
import type { Box } from '@/views/experiments/factory-arm/scene/boxes/spec';

// Slab
import {
  near,
  shared,
  type Slab,
  under,
} from '@/views/experiments/factory-arm/scene/grasp/slab';

// Constants
import { BOARDS, GAP, LEVEL, LIMIT, SUPPORT } from './constants';

/**
 * Where a case would rest with its base at `outline`, or nothing if it can't
 * go there safely. Safe means: most of its base rests on what is under it,
 * its centre is over a support, nothing under it is lighter, the load stays
 * under `LIMIT`, and nothing taller is in the way of setting it down.
 */
const fit = (outline: Slab, pad: Slab, box: Box, loaded: Slab[]) => {
  const below = loaded.filter((other) => shared(outline, other) > 1e-4);
  const base = Math.max(BOARDS, ...below.map((other) => other.top));
  const top = base + box.size[1];

  // Setting it down must not scrape anything: a neighbour taller than the base
  // keeps clear of the case, and one taller than the case's top keeps clear of
  // the pad too, which is wider than a small case.
  const clear = loaded.every(
    (other) =>
      other.top <= base + LEVEL ||
      (!near(outline, other, GAP) &&
        (other.top <= top + LEVEL || !near(pad, other, GAP)))
  );

  if (!clear || top > BOARDS + LIMIT) {
    return null;
  }

  if (base === BOARDS) {
    return { base, top };
  }

  const supports = below.filter((other) => other.top > base - LEVEL);
  const area = (outline.x[1] - outline.x[0]) * (outline.z[1] - outline.z[0]);
  const rested = supports.reduce(
    (sum, other) => sum + shared(outline, other),
    0
  );
  const centre = {
    x: (outline.x[0] + outline.x[1]) / 2,
    z: (outline.z[0] + outline.z[1]) / 2,
  };

  const steady =
    rested / area >= SUPPORT &&
    supports.some((other) => under(other, centre.x, centre.z)) &&
    supports.every((other) => other.mass >= box.mass);

  return steady ? { base, top } : null;
};

export { fit };
