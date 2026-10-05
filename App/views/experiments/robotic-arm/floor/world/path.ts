import type { Point } from 'arm/grid';

import type { Walker } from './types';

const lengthOf = (path: readonly Point[]) =>
  path.reduce((total, point, index) => {
    const next = path[(index + 1) % path.length];

    return total + Math.hypot(next.x - point.x, next.z - point.z);
  }, 0);

/** Moves a walker `distance` metres further round its closed path. */
const walk = (walker: Walker, distance: number) => {
  const { path } = walker;
  let left = (walker.travelled + distance) % lengthOf(path);

  walker.travelled = left;

  for (let index = 0; index < path.length; index++) {
    const from = path[index];
    const to = path[(index + 1) % path.length];
    const span = Math.hypot(to.x - from.x, to.z - from.z);

    if (left <= span) {
      const t = span ? left / span : 0;

      walker.position = {
        x: from.x + (to.x - from.x) * t,
        z: from.z + (to.z - from.z) * t,
      };
      walker.heading = Math.atan2(to.x - from.x, to.z - from.z);

      return;
    }

    left -= span;
  }
};

export { lengthOf, walk };
