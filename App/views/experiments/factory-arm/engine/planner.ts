// Kinematics
import {
  solve,
  type Point,
} from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Arm geometry
import { type Carried, collides, grazes } from './body';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/scene/constants';

// Partials
import { line, transfer, type Surroundings, type Waypoint } from './motion';
import { spots } from './placement';
import { cases, extent, over, place, remove } from './world';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';
import type { Case, World } from './spec';

/** Heights above a case's top where the arm's reach down to it is checked, in metres. */
const REACH = [0, 0.3, 0.6];

/** How many places a case tries before it counts as having nowhere to go. */
const TRIES = 8;

/**
 * One case moved: from where to where, and the waypoints that do it, from
 * wherever the pad was when the move began to the case set down.
 */
type Move = {
  id: string;
  to: 'belt' | 'buffer';
  from: Point;
  at: Point;
  turned: boolean;
  waypoints: Waypoint[];
};

/** Why a plan can't be made: which case, what for, and the obstacles in the way. */
type Refusal = {
  id: string;
  reason: 'reach' | 'room' | 'way';
  across: string[];
};

type Plan = { moves: Move[]; world: World } | { refused: Refusal };

/** What the arm keeps clear of, the case `except` aside: the obstacles and every other case. */
const surroundings = (state: World, except: string): Surroundings => ({
  cases: cases(state)
    .filter(({ id }) => id !== except)
    .map((one) => ({ id: one.id, ...extent(one) })),
  obstacles: state.obstacles,
});

const highest = (state: World, except: string) =>
  Math.max(
    0,
    ...cases(state)
      .filter(({ id }) => id !== except)
      .map((one) => extent(one).max.y)
  );

/** The middle of a case's top face, where the pad takes it. */
const top = (one: Case): Point => ({ ...one.at, y: extent(one).max.y });

/** The cases the arm's links would reach through, coming down onto `id`. */
const overreached = (state: World, id: string) => {
  const own = state.cases[id];
  const { cases: others } = surroundings(state, id);

  return [
    ...new Set(
      REACH.flatMap((up) =>
        grazes(solve({ ...top(own), y: top(own).y + up }, 0, 0), others).map(
          ({ id: other }) => other
        )
      )
    ),
  ];
};

/**
 * Every case to move so `id` can be lifted, in order, then `id` itself: the
 * cases on it, and the cases the arm would reach through to get to it, and
 * theirs before them, highest first.
 */
const order = (state: World, id: string): string[] => {
  const chain: string[] = [];
  const visiting = new Set<string>();

  const visit = (current: string) => {
    if (chain.includes(current) || visiting.has(current)) {
      return;
    }

    visiting.add(current);

    const inWay = [
      ...new Set([
        ...over(state, current).map(({ id: other }) => other),
        ...overreached(state, current),
      ]),
    ].sort((a, b) => state.cases[b].at.y - state.cases[a].at.y);

    inWay.forEach(visit);
    chain.push(current);
  };

  visit(id);

  return chain;
};

/** Places on the belt, each with the case's long side along it. */
const drops = (one: Case) =>
  CONVEYOR.drops.map((z) => ({
    at: { x: CONVEYOR.x, y: CONVEYOR.height + one.size[1] / 2, z },
    buries: [] as string[],
    // The belt runs along z: a case longer across x turns to lie along it.
    turned: one.size[0] > one.size[2],
  }));

/**
 * Where a case on the pad goes from `from`, facing `facing`: the belt, or
 * the best place on the buffer the arm can get it to. `later` are cases
 * still to be picked up, which a buffer place shouldn't bury. It never goes
 * back in the way of `target`, on it or where the arm reaches through to it,
 * or the next pick would go through it.
 */
const carry = (
  cell: World,
  own: Case,
  from: Point,
  facing: number,
  to: Move['to'],
  later: string[],
  target: string
):
  | { spot: { at: Point; turned: boolean }; waypoints: Waypoint[] }
  | { refused: Refusal } => {
  const carried: Carried = {
    size: own.size,
    yaw: 0,
    offset: { x: 0, y: -own.size[1] / 2, z: 0 },
  };
  const lifted = remove(cell, own.id);
  const back = { ...cell, cases: { ...cell.cases, [own.id]: own } };
  const clear = (spot: { at: Point; turned: boolean }) =>
    !order(place(back, own.id, spot.at, spot.turned), target).includes(own.id);
  const places: { at: Point; turned: boolean }[] = [];

  for (const spot of to === 'belt' ? drops(own) : spots(back, own.id, later)) {
    if (places.length === TRIES) break;
    if (to === 'belt' || clear(spot)) places.push(spot);
  }

  const blocked: (() => string[])[] = [];

  for (const spot of places) {
    const down = { ...spot.at, y: spot.at.y + own.size[1] / 2 };
    const way = transfer(
      from,
      down,
      [facing, spot.turned ? Math.PI / 2 : 0],
      carried,
      surroundings(lifted, own.id),
      highest(lifted, own.id),
      { rise: true, fall: true }
    );

    if ('waypoints' in way) {
      return { spot, waypoints: way.waypoints };
    }

    blocked.push(way.blocked);
  }

  return {
    refused: {
      id: own.id,
      reason: to === 'buffer' && !places.length ? 'room' : 'way',
      across: [...new Set(blocked.flatMap((find) => find()))],
    },
  };
};

/** Marks the last of `waypoints` with `action`. */
const ending = (waypoints: Waypoint[], action: Waypoint['action']) =>
  waypoints.map((waypoint, step) =>
    step === waypoints.length - 1 ? { ...waypoint, action } : waypoint
  );

/**
 * The whole job for a click on `target`, played forward on a copy of the
 * cell: each case in the way to the buffer, then `target` to the belt. It
 * starts from the pad at `pad`, facing `facing`, in contact with a case if
 * `touching`. `holding` is a case already on the pad, set down first.
 * `reserved` are cases already queued, which a buffer place mustn't bury if
 * it can help it. One of them in the way goes straight to the belt, since
 * it's going there anyway, and takes no room on the buffer.
 *
 * A plan is only returned when every move in it works, so the arm never
 * picks up a case it has nowhere to put. Otherwise it says which case
 * couldn't be moved, why, and what was in the way.
 */
const plan = (
  state: World,
  target: string,
  pad: Point,
  {
    facing: start = 0,
    holding,
    reserved = [],
    touching = false,
  }: {
    facing?: number;
    holding?: Case;
    reserved?: string[];
    touching?: boolean;
  } = {}
): Plan => {
  const moves: Move[] = [];
  let cell = state;
  let from = pad;
  let facing = start;
  let inContact = touching;

  const settle = (
    own: Case,
    to: Move['to'],
    later: string[],
    reach: Waypoint[]
  ): Refusal | null => {
    const found = carry(cell, own, from, facing, to, later, target);

    if ('refused' in found) {
      return found.refused;
    }

    const { spot, waypoints } = found;
    const last = waypoints[waypoints.length - 1];

    moves.push({
      id: own.id,
      to,
      from: own.at,
      at: spot.at,
      turned: spot.turned,
      waypoints: [...reach, ...ending(waypoints, 'place')],
    });
    cell =
      to === 'belt'
        ? remove(cell, own.id)
        : place(
            { ...cell, cases: { ...cell.cases, [own.id]: own } },
            own.id,
            spot.at,
            spot.turned
          );
    from = last.target;
    facing = last.facing;
    inContact = true;

    return null;
  };

  const bound = (id: string): Move['to'] =>
    id === target || reserved.includes(id) ? 'belt' : 'buffer';

  // A case already on the pad goes first: the belt if it's asked for.
  if (holding) {
    const refused = settle(holding, bound(holding.id), reserved, []);

    if (refused) {
      return { refused };
    }

    if (holding.id === target) {
      return { moves, world: cell };
    }
  }

  const chain = order(cell, target);

  for (const [index, id] of chain.entries()) {
    const own = cell.cases[id];
    const pick = top(own);

    // Over to the case and down onto it.
    const reach = transfer(
      from,
      pick,
      [facing, 0],
      undefined,
      surroundings(cell, id),
      highest(cell, id),
      { rise: inContact, fall: true }
    );

    if ('blocked' in reach) {
      return { refused: { id, reason: 'reach', across: reach.blocked() } };
    }

    // The pad now takes the case where it stands; its reach turned the pad to face 0.
    from = pick;
    facing = 0;
    cell = remove(cell, id);

    const refused = settle(
      own,
      bound(id),
      [...chain.slice(index + 1), ...reserved],
      ending(reach.waypoints, 'pick')
    );

    if (refused) {
      return { refused };
    }
  }

  return { moves, world: cell };
};

/**
 * Whether the rest of a job, from the pad at `pad` on through `moves` from move `move`, step `step`, still keeps clear of
 * `obstacles`. `holding` is the case on the pad now. The cases are where
 * the job left them, so only the obstacles need checking again.
 */
const clears = (
  moves: Move[],
  { move, step }: { move: number; step: number },
  pad: Point,
  holding: Case | undefined,
  cells: Record<string, Case>,
  obstacles: Solid[]
) => {
  let from = pad;
  let own = holding;

  return moves.slice(move).every((next, index) =>
    next.waypoints.slice(index ? 0 : step).every((waypoint) => {
      const carried: Carried | undefined = own && {
        size: own.size,
        yaw: 0,
        offset: { x: 0, y: -own.size[1] / 2, z: 0 },
      };
      // The poses the arm takes as it's driven, turned to the waypoint's heading.
      const ok = line(from, waypoint.target).every(
        (point) =>
          !collides(
            solve(point, own ? 1 : 0, waypoint.facing),
            carried,
            obstacles
          )
      );

      from = waypoint.target;
      own =
        waypoint.action === 'pick'
          ? cells[next.id]
          : waypoint.action === 'place'
            ? undefined
            : own;

      return ok;
    })
  );
};

export { clears, order, plan, type Move, type Plan, type Refusal };
