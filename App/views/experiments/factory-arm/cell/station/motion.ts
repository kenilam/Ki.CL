// Protocol
import type { Box, Point } from '../protocol';

// Model
import { type Carried, collides, grazes, hitting } from '../model/body';
import { ceiling, forward, solve } from '../model/kinematics';

// Spec
import type { Waypoint } from './spec';

/** Spacing of the poses tested along a move, in metres. */
const SAMPLE = 0.03;

/** Height the carried case keeps above anything it swings over, in metres. */
const CLEARANCE = 0.2;

/** Room kept under the arm's reach ceiling, in metres. */
const HEADROOM = 0.02;

/**
 * Share of a swing by which the pad has finished turning to its new heading:
 * early, high above everything, so it's square well before it comes down.
 */
const TURNED = 0.4;

/** The pad's heading `share` of the way along a move from `facing[0]` to `facing[1]`. */
const turning = (facing: [number, number], share: number) =>
  facing[0] + (facing[1] - facing[0]) * Math.min(1, share / TURNED);

/** Steps between the travel heights tried, in metres. */
const RISE = 0.1;

/**
 * Straight-line speeds in metres per second, and the distance from contact
 * over which the pad eases between them. `swing` is the speed between.
 */
const LINE = { fast: 1, near: 0.25, slow: 0.06, swing: 0.9 };

/**
 * How fast to move along a straight line, given how far the pad has come and
 * how far there is to go. Contact is at the end when arriving and at the
 * start when leaving; within `LINE.near` of it the speed eases down to
 * `LINE.slow`, so the pad meets a case gently and lifts it out gently.
 */
const speed = (
  ease: Waypoint['ease'],
  travelled: number,
  remaining: number
) => {
  if (ease === 'swing') {
    return LINE.swing;
  }

  const gap = ease === 'arrive' ? remaining : travelled;
  const share = Math.min(1, Math.max(0, gap / LINE.near));
  const smooth = share * share * (3 - 2 * share);

  return LINE.slow + (LINE.fast - LINE.slow) * smooth;
};

/** The point `distance` along the line from `from` to `to`, stopping at `to`. */
const along = (from: Point, to: Point, distance: number): Point => {
  const length = Math.hypot(to.x - from.x, to.y - from.y, to.z - from.z);
  const share = length ? Math.min(1, distance / length) : 1;

  return {
    x: from.x + (to.x - from.x) * share,
    y: from.y + (to.y - from.y) * share,
    z: from.z + (to.z - from.z) * share,
  };
};

/** What a move is checked against: obstacles, and the cases on the pallets. */
type Surroundings = { obstacles: Box[]; cases: Box[] };

/** The arm's heading round its base for a pad position. */
const around = ({ x, z }: Pick<Point, 'x' | 'z'>) => Math.atan2(x, z);

/** Whether the pad can reach `point` facing `facing`, to within a centimetre. */
const reaches = (point: Point, facing: number) => {
  const reached = forward(solve(point, 0, facing));

  return (
    Math.hypot(reached.x - point.x, reached.y - point.y, reached.z - point.z) <
    0.01
  );
};

/**
 * The pad positions along a swing at height `y` from above `from` to above
 * `to`, turning `way` (1 or -1) round the base: an arc, as the arm turns,
 * with the reach easing between the two.
 */
const arc = (from: Point, to: Point, y: number, way: 1 | -1): Point[] => {
  const start = around(from);
  const radius = [Math.hypot(from.x, from.z), Math.hypot(to.x, to.z)];
  let sweep = around(to) - start;

  // The short way or the long way round, as asked.
  while (way > 0 ? sweep < 0 : sweep > 0) sweep += way * Math.PI * 2;
  while (Math.abs(sweep) > Math.PI * 2) sweep -= way * Math.PI * 2;

  const length =
    Math.abs(sweep) * Math.max(...radius) + Math.abs(radius[1] - radius[0]);
  const count = Math.max(1, Math.ceil(length / SAMPLE));

  return Array.from({ length: count + 1 }, (_, index) => {
    const share = index / count;
    const angle = start + sweep * share;
    const reach = radius[0] + (radius[1] - radius[0]) * share;

    return { x: reach * Math.sin(angle), y, z: reach * Math.cos(angle) };
  });
};

/** How close to the base a swing may tuck the case in to turn, in metres; none keeps the reach as it is. */
const TUCKS = [null, 1, 0.8, 0.7] as const;

/**
 * The swing from above `from` to above `to`: straight round on an arc, or
 * with the case tucked in to `tuck` from the base first, turned there, and
 * reached out again, as a palletising arm pulls its load in to turn past
 * something.
 */
const swing = (
  from: Point,
  to: Point,
  y: number,
  way: 1 | -1,
  tuck: number | null
): Point[] => {
  if (tuck === null) {
    return arc(from, to, y, way);
  }

  const inward = (point: Point): Point => {
    const reach = Math.hypot(point.x, point.z);
    const share = Math.min(1, tuck / reach);

    return { x: point.x * share, y, z: point.z * share };
  };
  const [a, b] = [inward(from), inward(to)];

  return [
    ...line(from, a),
    ...arc(a, b, y, way).slice(1),
    ...line(b, to).slice(1),
  ];
};

/** The pad positions along a straight line. */
const line = (from: Point, to: Point): Point[] => {
  const length = Math.hypot(to.x - from.x, to.y - from.y, to.z - from.z);
  const count = Math.max(1, Math.ceil(length / SAMPLE));

  return Array.from({ length: count + 1 }, (_, index) => {
    const share = index / count;

    return {
      x: from.x + (to.x - from.x) * share,
      y: from.y + (to.y - from.y) * share,
      z: from.z + (to.z - from.z) * share,
    };
  });
};

/**
 * Whether the arm can follow `points`, turning its heading from `facing[0]`
 * to `facing[1]` on the way, clear of what's around.
 *
 * In `contact`, going straight into or out of a stack, the gripper and its
 * case pass through their own column, which is clear by the time the move
 * is planned; only obstacles count for them, and the links reaching over
 * the stack keep off the cases. Otherwise everything keeps clear of
 * everything.
 */
const follows = (
  points: Point[],
  facing: [number, number],
  carried: Carried | undefined,
  { cases, obstacles }: Surroundings,
  contact: boolean
) =>
  points.every((point, index) => {
    const share = points.length > 1 ? index / (points.length - 1) : 1;
    const heading = turning(facing, share);
    const joints = solve(point, carried ? 1 : 0, heading);

    if (!reaches(point, heading)) {
      return false;
    }

    return contact
      ? !collides(joints, carried, obstacles) && !grazes(joints, cases).length
      : !collides(joints, carried, [...obstacles, ...cases]);
  });

/**
 * The obstacles the arm meets following `points` as `follows` does, added to
 * `seed`; `null` when it can't be done whatever the obstacles, out of reach
 * or into a case. It stops looking once two are in the way: a move blocked
 * by two can't be blamed on either alone.
 */
const trace = (
  points: Point[],
  facing: [number, number],
  carried: Carried | undefined,
  { cases, obstacles }: Surroundings,
  contact: boolean,
  seed: Set<string>
) => {
  const found = new Set(seed);

  for (const [index, point] of points.entries()) {
    const share = points.length > 1 ? index / (points.length - 1) : 1;
    const heading = turning(facing, share);
    const joints = solve(point, carried ? 1 : 0, heading);

    if (
      !reaches(point, heading) ||
      (contact
        ? grazes(joints, cases).length
        : collides(joints, carried, cases))
    ) {
      return null;
    }

    hitting(joints, carried, obstacles).forEach(({ id }) => found.add(id));

    if (found.size > 1) {
      return found;
    }
  }

  return found;
};

/** The travel heights worth trying between two spots, lowest first. */
const heights = (from: Point, to: Point, highest: number, hanging: number) => {
  const top = Math.min(ceiling(from), ceiling(to)) - HEADROOM;
  const low = Math.max(highest + hanging + CLEARANCE, from.y, to.y);
  const found: number[] = [];

  for (let y = low; y < top; y += RISE) {
    found.push(y);
  }

  // A swing may start by coming down, from a pad held higher than the arm can reach over the way; never end by going up.
  return [...found, top].filter((y) => y >= to.y - 1e-6);
};

/**
 * A way for the pad from `from` to `to` that goes straight up, swings at a
 * safe height, and comes straight down: the lowest height that works, wide
 * before tucked in, the short way round before the long. `rise` and `fall` say whether the ends are
 * in contact with a case, where only the links must keep off the stacks.
 * Returns the waypoints after `from`, or a way to find what's in the way.
 */
const transfer = (
  from: Point,
  to: Point,
  facing: [number, number],
  carried: Carried | undefined,
  surroundings: Surroundings,
  highest: number,
  ends: { rise: boolean; fall: boolean }
): { waypoints: Waypoint[] } | { blocked: () => string[] } => {
  const hanging = carried ? carried.size[1] : 0;
  const shortWay = ((): 1 | -1 => {
    let sweep = around(to) - around(from);

    while (sweep > Math.PI) sweep -= Math.PI * 2;
    while (sweep < -Math.PI) sweep += Math.PI * 2;

    return sweep >= 0 ? 1 : -1;
  })();

  const attempt = (surroundings: Surroundings) => {
    for (const y of heights(from, to, highest, hanging)) {
      const up = { ...from, y };
      const over = { ...to, y };

      if (
        !follows(
          line(from, up),
          [facing[0], facing[0]],
          carried,
          surroundings,
          ends.rise
        )
      ) {
        continue;
      }

      if (
        !follows(
          line(over, to),
          [facing[1], facing[1]],
          carried,
          surroundings,
          ends.fall
        )
      ) {
        continue;
      }

      for (const tuck of TUCKS) {
        for (const way of [shortWay, -shortWay as 1 | -1]) {
          if (
            follows(
              swing(up, over, y, way, tuck),
              facing,
              carried,
              surroundings,
              false
            )
          ) {
            return { up, over, way, tuck };
          }
        }
      }
    }

    return null;
  };

  /*
   * No way: the obstacles to blame are those that alone stand in the way of
   * a way, so moving any one of them would open it. Each way is traced once,
   * collecting what it meets, rather than searched again without each obstacle.
   */
  const blame = () => {
    const blamed = new Set<string>();

    for (const y of heights(from, to, highest, hanging)) {
      const up = { ...from, y };
      const over = { ...to, y };
      const rise = trace(
        line(from, up),
        [facing[0], facing[0]],
        carried,
        surroundings,
        ends.rise,
        new Set()
      );
      const fall =
        rise &&
        rise.size < 2 &&
        trace(
          line(over, to),
          [facing[1], facing[1]],
          carried,
          surroundings,
          ends.fall,
          rise
        );

      if (!fall || fall.size > 1) {
        continue;
      }

      for (const tuck of TUCKS) {
        for (const way of [shortWay, -shortWay as 1 | -1]) {
          const swept = trace(
            swing(up, over, y, way, tuck),
            facing,
            carried,
            surroundings,
            false,
            fall
          );

          if (swept?.size === 1) {
            swept.forEach((id) => blamed.add(id));
          }
        }
      }
    }

    return surroundings.obstacles
      .filter(({ id }) => blamed.has(id))
      .map(({ id }) => id);
  };

  const found = attempt(surroundings);

  // Worked out only when asked for: a caller with other ways to try seldom needs it.
  if (!found) {
    return { blocked: blame };
  }

  const { up, over, way, tuck } = found;
  // The swing's own points, thinned: every tenth keeps its shape round the base.
  const bends = swing(up, over, up.y, way, tuck).filter(
    (_, index, all) =>
      index > 0 && (index % 10 === 0 || index === all.length - 1)
  );

  return {
    waypoints: [
      { target: up, facing: facing[0], ease: 'leave' },
      ...bends.map((target, index): Waypoint => ({
        target,
        facing: turning(facing, (index + 1) / bends.length),
        ease: 'swing',
      })),
      { target: to, facing: facing[1], ease: 'arrive' },
    ],
  };
};

export {
  CLEARANCE,
  along,
  arc,
  follows,
  line,
  reaches,
  speed,
  transfer,
  type Surroundings,
};
