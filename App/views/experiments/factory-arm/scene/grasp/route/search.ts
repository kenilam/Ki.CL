// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Body
import type { Carried } from './body';

// Check
import { checker } from './check';

/** Grid spacing for the search, in metres. */
const CELL = 0.1;

/** Highest the pad is sent while going round something, in metres. */
const CEILING = 2.3;

/** Nodes looked at before a search gives up and calls the way blocked. */
const BUDGET = 30000;

/**
 * Milliseconds a search may run before it gives up the same way. A way that
 * isn't there costs the whole budget, and planning runs in the frame.
 */
const DEADLINE = 200;

/**
 * How much more the distance still to go counts than the distance come. Over
 * 1 the search heads for the goal and finds long ways round far sooner, for
 * a way that may be a little longer; `shorten` straightens it afterwards.
 */
const GREED = 2;

type Node = {
  key: string;
  point: Point;
  cost: number;
  guess: number;
  from?: Node;
};

const gap = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);

/** A binary heap of nodes, cheapest estimated total first. */
const heap = () => {
  const items: Node[] = [];
  const score = (node: Node) => node.cost + node.guess * GREED;
  const swap = (a: number, b: number) =>
    ([items[a], items[b]] = [items[b], items[a]]);

  return {
    get size() {
      return items.length;
    },
    push(node: Node) {
      items.push(node);

      for (let at = items.length - 1; at > 0;) {
        const parent = (at - 1) >> 1;

        if (score(items[parent]) <= score(items[at])) break;
        swap(parent, at);
        at = parent;
      }
    },
    pop() {
      const first = items[0];
      const last = items.pop();

      if (items.length && last) {
        items[0] = last;

        for (let at = 0; ;) {
          const left = at * 2 + 1;
          const right = left + 1;
          let low = at;

          if (left < items.length && score(items[left]) < score(items[low]))
            low = left;
          if (right < items.length && score(items[right]) < score(items[low]))
            low = right;
          if (low === at) break;
          swap(low, at);
          at = low;
        }
      }

      return first;
    },
  };
};

/** Cuts every corner a straight move can take, so the arm doesn't zigzag the grid. */
const shorten = (
  path: Point[],
  straight: (from: Point, to: Point) => boolean
) => {
  const kept = [path[0]];
  let at = 0;

  while (at < path.length - 1) {
    let next = path.length - 1;

    while (next > at + 1 && !straight(path[at], path[next])) {
      next -= 1;
    }

    kept.push(path[next]);
    at = next;
  }

  return kept;
};

/**
 * A way for the pad from `from` to `to` that keeps the arm and what it carries
 * clear of `solids`, as the waypoints after `from`; or nothing if there is
 * none.
 *
 * A* over a grid of pad positions, each one reachable with the hand down and
 * clear of everything known, moving to any of the 26 around it along a move
 * that is clear too. The pad stays
 * at or above `floor`, so going round something never dips into the stacks
 * below the travel height. The grid path is then shortened by cutting corners.
 */
const route = (
  from: Point,
  to: Point,
  facing: number,
  carried: Carried | undefined,
  solids: Solid[],
  floor: number
): Point[] | null => {
  const { free, straight } = checker(facing, carried, solids);

  if (straight(from, to)) {
    return [to];
  }

  const valid = new Map<string, boolean>();
  const open = heap();
  const closed = new Set<string>();

  const cellOf = (point: Point) =>
    [point.x, point.y, point.z].map((value) => Math.round(value / CELL));
  const keyOf = (cell: number[]) => cell.join(',');
  const pointOf = ([i, j, k]: number[]): Point => ({
    x: i * CELL,
    y: j * CELL,
    z: k * CELL,
  });

  const usable = (cell: number[]) => {
    const key = keyOf(cell);

    if (!valid.has(key)) {
      const point = pointOf(cell);

      valid.set(
        key,
        point.y >= floor - 1e-6 && point.y <= CEILING && free(point)
      );
    }

    return valid.get(key);
  };

  /*
   * Enter the grid at the cells around the start the pad can move to directly.
   * When the arm is already too close to something - it was seen late - any
   * clear cell next to it will do, so it can back away.
   */
  const escaping = !free(from);
  const [ci, cj, ck] = cellOf(from);

  for (const i of [ci - 1, ci, ci + 1]) {
    for (const j of [cj - 1, cj, cj + 1]) {
      for (const k of [ck - 1, ck, ck + 1]) {
        const cell = [i, j, k];
        const point = pointOf(cell);

        if (usable(cell) && (escaping || straight(from, point))) {
          const cost = gap(from, point);

          open.push({ key: keyOf(cell), point, cost, guess: gap(point, to) });
        }
      }
    }
  }

  const until = performance.now() + DEADLINE;

  for (let looked = 0; open.size && looked < BUDGET; looked++) {
    // The clock is read every so often: reading it costs too.
    if (looked % 256 === 0 && performance.now() > until) {
      break;
    }

    const node = open.pop();

    if (closed.has(node.key)) continue;
    closed.add(node.key);

    // Leave the grid once the goal is near and a straight move reaches it.
    if (gap(node.point, to) < CELL * 2 && straight(node.point, to)) {
      const path: Point[] = [to];

      for (let at: Node | undefined = node; at; at = at.from)
        path.unshift(at.point);

      return shorten([from, ...path], straight).slice(1);
    }

    const cell = cellOf(node.point);

    for (const di of [-1, 0, 1]) {
      for (const dj of [-1, 0, 1]) {
        for (const dk of [-1, 0, 1]) {
          if (!di && !dj && !dk) continue;

          const next = [cell[0] + di, cell[1] + dj, cell[2] + dk];
          const key = keyOf(next);

          if (closed.has(key) || !usable(next)) continue;

          const point = pointOf(next);

          // Both ends clear isn't enough: a diagonal can cut a corner of something.
          if (!straight(node.point, point)) continue;

          open.push({
            key,
            point,
            cost: node.cost + gap(node.point, point),
            guess: gap(point, to),
            from: node,
          });
        }
      }
    }
  }

  return null;
};

export { route };
