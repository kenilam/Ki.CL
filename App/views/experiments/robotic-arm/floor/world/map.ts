import { distance, key, members, range, toPoint } from 'arm/grid';

import { inside, type Rect } from './support';
import type { World } from './types';

/*
 * The map an AMR is loaded with: the hexes it may not drive through. That is
 * anything fixed on the floor (walls, pillars, posts, belts), every arm cell
 * (it may only drive into a cell to the slot it was sent to), and the edge of
 * the floor.
 */

/** Room kept round a fixed obstacle for the AMR's body, in metres. */
const MARGIN = 0.75;

const grow = (rect: Rect): Rect => ({
  ...rect,
  width: rect.width + MARGIN * 2,
  depth: rect.depth + MARGIN * 2,
});

const map = (world: World) => {
  const { centre, radius } = world.ground;
  const hexes = range(centre, radius + 1);
  const fixed: Rect[] = [
    ...world.obstacles.map(({ heading, position, size }) => ({
      ...position,
      width: size[0],
      depth: size[2],
      heading,
    })),
    ...world.belts.map(({ heading, length, start, width }) => ({
      x: start.x + (Math.sin(heading) * length) / 2,
      z: start.z + (Math.cos(heading) * length) / 2,
      width,
      depth: length,
      heading,
    })),
  ].map(grow);

  const blocked = hexes.filter((hex) => {
    const { x, z } = toPoint(hex);

    return (
      distance(hex, centre) > radius || fixed.some((rect) => inside(rect, x, z))
    );
  });

  return [...blocked, ...world.arms.flatMap(({ cell }) => members(cell))].map(
    key
  );
};

export { map };
