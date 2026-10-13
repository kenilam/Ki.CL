import { GLOBE, toFrame, type Page } from './layout';

/**
 * How near a place's mark the pointer has to be, as a chord on the unit
 * globe. About twice the mark's own radius, so a finger finds it.
 */
const REACH = 0.09;

type Pointer = Page & {
  /** Unit vectors in the globe's frame. */
  places: readonly (readonly number[])[];
  /** Viewer to globe, column-major. */
  view: readonly number[];
  /** The pointer, from the page's top left. */
  x: number;
  y: number;
};

/** Index of the place under the pointer, or -1. Places on the far side are never under it. */
function toPlaceAt({ places, view, x, y, ...page }: Pointer): number {
  const frame = toFrame(page);
  const across = (x - frame.x) / frame.size / GLOBE;
  /* The page counts down and the globe counts up. */
  const up = (frame.y - y) / frame.size / GLOBE;
  const depth = 1 - across * across - up * up;

  if (depth < 0) {
    return -1;
  }

  const seen = [across, up, Math.sqrt(depth)];
  const point = [0, 1, 2].map(
    (row) =>
      view[row] * seen[0] + view[3 + row] * seen[1] + view[6 + row] * seen[2]
  );
  const away = places.map((place) =>
    Math.hypot(place[0] - point[0], place[1] - point[1], place[2] - point[2])
  );
  const nearest = away.indexOf(Math.min(...away));

  return away[nearest] < REACH ? nearest : -1;
}

export { toPlaceAt };
