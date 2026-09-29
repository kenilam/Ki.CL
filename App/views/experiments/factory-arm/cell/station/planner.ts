// Protocol
import type { Box, Instruction, Point } from '../protocol';

// Model
import { type Carried, collides, grazes } from '../model/body';
import { inside, solve } from '../model/kinematics';

// Grid
import { type Belt, type Layout, onBelt, type Vector } from '../grid/layout';

// Partials
import { line, transfer, type Surroundings } from './motion';
import { spots } from './placement';
import { cases, extent, over, place, remove } from './world';

// Spec
import {
  BUFFER,
  type Case,
  HERE,
  type Move,
  type Refusal,
  type Spot,
  stays,
  type Waypoint,
  type World,
} from './spec';

/** Heights above a case's top where the arm's reach down to it is checked, in metres. */
const REACH = [0, 0.3, 0.6];

/** How many places a case tries before it counts as having nowhere to go. */
const TRIES = 8;

/** The tallest case a belt carries, in metres: a swing across a belt keeps clear of what rides it. */
const TALLEST = 0.45;

/** How far the pad comes back in from a belt once its case is down, in metres: clear of what rides past. */
const BACK = 0.6;

/** `point` pulled `BACK` metres in toward the turret, as far as the pad can go. */
const inward = (point: Point): Point => {
  const radius = Math.hypot(point.x, point.z);
  const share = Math.max(0, radius - BACK) / (radius || 1);

  return inside({ x: point.x * share, y: point.y, z: point.z * share });
};

/** The height a swing must clear round `layout`: what rides its belts, whatever stands on its pallets. */
const envelope = (layout: Layout) =>
  Math.max(0, ...layout.belts.map(({ height }) => height + TALLEST));

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
        grazes(
          solve({ ...top(own), y: top(own).y + up }, 0, own.yaw),
          others
        ).map(({ id: other }) => other)
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

/**
 * The pad's heading that lays a case's long side along a belt. The pad
 * faces the way `rotation.y` turns, from +z; a belt's heading runs from +x.
 */
const lengthways = (one: Case, belt: Belt) =>
  one.size[0] > one.size[2] ? -belt.heading : Math.PI / 2 - belt.heading;

/** Places along a belt, best first, each with the case's long side along it. */
const drops = (belt: Belt, one: Case): Spot[] =>
  belt.drops.map((distance) => ({
    at: { ...onBelt(belt, distance), y: belt.height + one.size[1] / 2 },
    facing: lengthways(one, belt),
    buries: [],
  }));

/** Where a case goes: a belt out, the buffer, or pallets of this cell's own to stack on. */
type Bound = Belt | typeof BUFFER | Vector[];

/** The cases still to be picked up, and where each is bound. */
type Reserved = Record<string, Bound>;

/**
 * Where a case on the pad goes from `from`, facing `facing`: a belt, or
 * the best place on the buffer the arm can get it to. `later` are cases
 * still to be picked up, which a buffer place shouldn't bury. It never goes
 * back in the way of `target`, on it or where the arm reaches through to it.
 */
const carry = (
  layout: Layout,
  cell: World,
  own: Case,
  from: Point,
  facing: number,
  to: Bound,
  later: string[],
  target: string
): { spot: Spot; waypoints: Waypoint[] } | { refused: Refusal } => {
  const carried: Carried = {
    size: own.size,
    yaw: 0,
    offset: { x: 0, y: -own.size[1] / 2, z: 0 },
  };
  const lifted = remove(cell, own.id);
  const back = { ...cell, cases: { ...cell.cases, [own.id]: own } };
  const clear = (spot: Spot) =>
    !order(place(back, own.id, spot.at, spot.facing), target).includes(own.id);
  const places: Spot[] = [];

  const onto =
    to === BUFFER
      ? layout.buffer
        ? [layout.buffer]
        : []
      : Array.isArray(to)
        ? to
        : null;

  // Only a case put out of the way must stay out of the way; the one asked for goes where it's bound.
  for (const spot of onto
    ? spots(layout, back, own.id, later, onto)
    : drops(to as Belt, own)) {
    if (places.length === TRIES) break;
    if (to !== BUFFER || clear(spot)) places.push(spot);
  }

  const blocked: (() => string[])[] = [];

  for (const spot of places) {
    const down = { ...spot.at, y: spot.at.y + own.size[1] / 2 };
    const way = transfer(
      from,
      down,
      [facing, spot.facing],
      carried,
      surroundings(lifted, own.id),
      Math.max(highest(lifted, own.id), envelope(layout)),
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
      reason: onto && !places.length ? 'room' : 'way',
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
 * The whole job for `target` bound for `belt`, or for pallets here when it
 * has none, played forward on a copy of the cell: each case in the way to
 * the buffer, then `target` where it's bound.
 * It starts from the pad at `pad`, facing `facing`, in contact with a case
 * if `touching`. `holding` is a case already on the pad, set down first.
 * `reserved` are cases already queued, each with its belt, which a buffer
 * place mustn't bury if it can help it. One of them in the way goes
 * straight to its belt, since it's going there anyway.
 *
 * A plan is only returned when every move in it works, so the arm never
 * picks up a case it has nowhere to put. Otherwise it says which case
 * couldn't be moved, why, and what was in the way.
 */
const plan = (
  layout: Layout,
  state: World,
  {
    target,
    belt,
    onto = [],
  }: { target: string; belt: Belt | null; onto?: Vector[] },
  pad: Point,
  {
    facing: start = 0,
    holding,
    reserved = {},
    touching = false,
  }: {
    facing?: number;
    holding?: Case;
    reserved?: Reserved;
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
    to: Bound,
    later: string[],
    reach: Waypoint[]
  ): Refusal | null => {
    const found = carry(layout, cell, own, from, facing, to, later, target);

    if ('refused' in found) {
      return found.refused;
    }

    const { spot, waypoints } = found;
    const last = waypoints[waypoints.length - 1];

    moves.push({
      id: own.id,
      to: to === BUFFER ? BUFFER : Array.isArray(to) ? HERE : to.id,
      from: own.at,
      at: spot.at,
      facing: spot.facing,
      waypoints: [...reach, ...ending(waypoints, 'place')],
    });
    cell =
      to === BUFFER || Array.isArray(to)
        ? place(
            { ...cell, cases: { ...cell.cases, [own.id]: own } },
            own.id,
            spot.at,
            spot.facing
          )
        : remove(cell, own.id);
    from = last.target;
    facing = last.facing;
    inContact = true;

    return null;
  };

  const bound = (id: string): Bound =>
    id === target ? (belt ?? onto) : (reserved[id] ?? BUFFER);

  // A case already on the pad goes first: its belt if it's asked for.
  if (holding) {
    const refused = settle(
      holding,
      bound(holding.id),
      Object.keys(reserved),
      []
    );

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

    // Over to the case and down onto it, the pad turned to the case's own heading.
    const reach = transfer(
      from,
      pick,
      [facing, own.yaw],
      undefined,
      surroundings(cell, id),
      Math.max(highest(cell, id), envelope(layout)),
      { rise: inContact, fall: true }
    );

    if ('blocked' in reach) {
      return { refused: { id, reason: 'reach', across: reach.blocked() } };
    }

    from = pick;
    facing = own.yaw;
    cell = remove(cell, id);

    const refused = settle(
      own,
      bound(id),
      [...chain.slice(index + 1), ...Object.keys(reserved)],
      ending(reach.waypoints, 'pick')
    );

    if (refused) {
      return { refused };
    }
  }

  return { moves, world: cell };
};

/**
 * Whether the rest of a job, from the pad at `pad` on through `moves` from
 * move `move`, waypoint `step`, still keeps clear of `obstacles`. `holding`
 * is the case on the pad now. The cases are where the job left them, so
 * only the obstacles need checking again.
 */
const clears = (
  moves: Move[],
  { move, step }: { move: number; step: number },
  pad: Point,
  holding: Case | undefined,
  cells: Record<string, Case>,
  obstacles: Box[]
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

/** The gate a belt move waits at. */
const gate = (move: Move) => `${move.to}-${move.id}`;

/**
 * A job as the arm takes it: each waypoint a move, and a pick or place after
 * the move that lands on the case. A place on a belt waits at a gate above
 * the belt first, opened once the belt is clear there, and only then comes
 * down; once the case is down it goes back up and swings in off the belt.
 * `acts` says which instruction does what, so a progress report can be read
 * back into the cell, and `owners` which move and waypoint each instruction
 * belongs to.
 */
const instructions = (moves: Move[]) => {
  const steps: Instruction[] = [];
  const owners: { move: number; step: number }[] = [];
  const acts: {
    step: number;
    move: Move;
    action: 'gate' | 'pick' | 'place';
  }[] = [];
  const add = (step: Instruction, owner: { move: number; step: number }) => {
    steps.push(step);
    owners.push(owner);

    return steps.length - 1;
  };

  moves.forEach((move, index) =>
    move.waypoints.forEach(({ action, ease, facing, target }, step) => {
      const owner = { move: index, step };

      // Onto a belt, the arm waits above it for the hub's arm to say the belt is clear, then comes down.
      if (action === 'place' && !stays(move.to)) {
        acts.push({
          step: add({ do: 'gate', id: gate(move) }, owner),
          move,
          action: 'gate',
        });
      }

      add({ do: 'move', to: { at: target, facing }, ease }, owner);

      if (action) {
        acts.push({
          step: add({ do: action, case: move.id }, owner),
          move,
          action,
        });
      }

      if (action === 'place' && !stays(move.to)) {
        const up = move.waypoints[step - 1]?.target ?? target;

        add({ do: 'move', to: { at: up, facing }, ease: 'leave' }, owner);
        add(
          { do: 'move', to: { at: inward(up), facing }, ease: 'swing' },
          owner
        );
      }
    })
  );

  return { steps, acts, owners };
};

export { clears, gate, instructions, order, plan };
export type { Bound, Plan, Reserved };
