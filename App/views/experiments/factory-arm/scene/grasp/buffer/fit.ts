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
import {
  BOARDS,
  GAP,
  LEVEL,
  LIMIT,
  SLENDER,
  SUPPORT,
  TOUCH,
} from './constants';

/** The narrower side of the box round `slabs`, seen from above. */
const span = (slabs: Slab[]) =>
  Math.min(
    Math.max(...slabs.map(({ x }) => x[1])) -
      Math.min(...slabs.map(({ x }) => x[0])),
    Math.max(...slabs.map(({ z }) => z[1])) -
      Math.min(...slabs.map(({ z }) => z[0]))
  );

/** The cases a slab rests on: overlapping it, their tops at its underside. */
const beneath = (slab: Slab, loaded: Slab[]) =>
  loaded.filter(
    (other) =>
      other !== slab &&
      shared(slab, other) > 1e-4 &&
      Math.abs(other.top - slab.bottom) < LEVEL
  );

/**
 * The cases at `level`'s height that touch it side by side, and so stand as
 * one block with it: a packed layer, as on the incoming pallet, braces each
 * of its cases.
 */
const layer = (level: Slab[], loaded: Slab[]) => {
  const found = new Set(level);

  for (const slab of found) {
    for (const other of loaded) {
      if (
        !found.has(other) &&
        Math.abs(other.top - slab.top) < LEVEL &&
        near(slab, other, GAP + TOUCH)
      ) {
        found.add(other);
      }
    }
  }

  return [...found];
};

/**
 * The narrowest width a column stands on, from these supports down to the
 * boards: at each level, the span of the block holding it up. A lone column
 * of small cases is as narrow as they are; one in a packed layer is as wide
 * as the layer.
 */
const narrowest = (supports: Slab[], loaded: Slab[]) => {
  let level = layer(supports, loaded);
  let width = span(level);

  for (;;) {
    const under = [...new Set(level.flatMap((slab) => beneath(slab, loaded)))];

    if (!under.length) {
      return width;
    }

    level = layer(under, loaded);
    width = Math.min(width, span(level));
  }
};

/**
 * Where a case would rest with its base at `outline`, or nothing if it can't
 * go there safely. Safe means: most of its base rests on what is under it,
 * its centre is over a support, nothing under it is lighter, the column it
 * makes isn't too tall for how narrow it stands, the load stays under
 * `LIMIT`, and nothing taller is in the way of setting it down.
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
    supports.every((other) => other.mass >= box.mass) &&
    top - BOARDS <= SLENDER * narrowest(supports, loaded) + 1e-6;

  return steady ? { base, top } : null;
};

export { fit };
