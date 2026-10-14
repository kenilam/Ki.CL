import { PLACES, type Place } from './constants';
import { toSeen, toVector, toView } from './sun';

/** Right and up on the page, with the globe facing a place: east and north. */
const DIRECTIONS = {
  ArrowDown: [0, -1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, 1],
} as const;

export type Arrow = keyof typeof DIRECTIONS;

/** A place further off the arrow's line than this is not that way. About 70 degrees. */
const MIN_ALONG = 0.34;

export const isArrow = (key: string): key is Arrow => key in DIRECTIONS;

/**
 * The next place the way an arrow points, as the globe is seen when it faces
 * `from`. The nearest over the surface wins, and one off the arrow's line
 * counts as further away the more it is off. Nothing that way is `undefined`.
 */
export function toNearestToward(from: Place, arrow: Arrow): Place | undefined {
  const view = toView(from);
  const [right, up] = DIRECTIONS[arrow];
  let nearest: Place | undefined;
  let least = Infinity;

  for (const place of PLACES) {
    const [x, y, z] = toSeen(toVector(place), view);
    const across = Math.hypot(x, y);

    /* The place itself, or the point straight through the globe from it. */
    if (place === from || across < 0.0001) {
      continue;
    }

    const along = (x * right + y * up) / across;
    const cost = Math.acos(Math.max(-1, Math.min(1, z))) / along;

    if (along > MIN_ALONG && cost < least) {
      least = cost;
      nearest = place;
    }
  }

  return nearest;
}
