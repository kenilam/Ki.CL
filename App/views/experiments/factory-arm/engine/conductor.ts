// Kinematics
import type { Point } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Motion
import { along, speed } from '@/views/experiments/factory-arm/scene/grasp/plan';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/scene/obstacles/spec';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/scene/constants';

// Partials
import type { Waypoint } from './motion';
import { clears, type Move, order, type Plan, type Refusal } from './planner';
import type { Case, World } from './spec';
import { over, place, remove } from './world';

/** How close the pad must be to a waypoint to count as there, in metres. */
const ARRIVED = 0.01;

/** How close the pad's heading must be to a waypoint's, in radians: about half a degree. */
const SQUARE = 0.01;

/** Room kept on the belt round the drop point for the last case to move on, in metres. */
const ROOM = 0.6;

/** Milliseconds after the operator last moved an obstacle before refused cases are tried again. */
const SETTLE = 400;

/** The job under way: the case asked for, its moves, and how far through them the arm is. */
type Job = { target: string; moves: Move[]; move: number; step: number };

/** The case on the pad, and its turn round the pad when it was picked. */
type Holding = { own: Case; yaw: number };

/** A case riding the belt: how far along it, and its turn. */
type Rider = { z: number; yaw: number };

/** What the planner is asked: a job for `target`, from the pad at `pad`. */
type Request = {
  world: World;
  target: string;
  pad: Point;
  facing: number;
  holding?: Case;
  reserved: string[];
  touching: boolean;
};

/** Makes plans, now or later: `done` gets the plan once it's made. */
type Planner = { plan: (request: Request, done: (plan: Plan) => void) => void };

type Level = 'confirm' | 'error' | 'info' | 'warning';

/** What the cell around the arm is told: steps for the log, and what to light. */
type Event =
  | { type: 'note'; text: string; level: Level }
  | { type: 'refuse'; target: string; across: string[] }
  | { type: 'unpark'; target: string }
  | { type: 'alarm' }
  | { type: 'calm' };

/** Where the arm is this frame, and how long the frame was, in seconds. */
type Frame = {
  pad: Point;
  facing: number;
  delta: number;
  now: number;
  /** When the operator last moved an obstacle, in milliseconds. */
  moved: number;
};

/** Where to drive the pad, whether to hold, and the heading to turn it to. */
type Command = { target: Point; grip: number; facing: number };

/** How a case reads in the log. */
const label = (id: string) => `case ${id}`;

/** Where a point is, in words, for the log. */
const where = (point: Point) =>
  Math.abs(point.x - CONVEYOR.x) < CONVEYOR.width
    ? 'the belt'
    : point.z > 1
      ? 'the buffer'
      : 'the pallet';

/** The cell after `move`, its case set down; `holding` it already off the pallet. */
const after = (cell: World, move: Move, own: Case) => {
  const lifted = remove(cell, move.id);

  return move.to === 'belt'
    ? lifted
    : place(
        { ...lifted, cases: { ...lifted.cases, [move.id]: own } },
        move.id,
        move.at,
        move.turned
      );
};

/**
 * Runs the arm's work: the clicked cases in turn, each job planned whole
 * before the arm moves, the pad walked along each plan's waypoints, picking
 * and setting down as it goes. Plans come from `planners`: `arm` for the ones
 * the arm waits on, `background` for trying refused cases again, so a slow
 * refusal there never holds the arm up.
 *
 * The arm plans against `sense`, the obstacles it knows of. When they
 * change, it keeps going while the rest of its job stays clear, and holds
 * and plans the rest again from where it is once it doesn't. A case asked
 * for while it works changes only the moves after the one under way, unless
 * that one would bury it.
 *
 * `frame` is called once a frame and says where to drive the pad; `flush`
 * hands over what happened since it was last called. `resting` is a case's
 * turn as it's drawn, for it to keep on the pad and the belt.
 */
const conduct = ({
  world,
  planners,
  resting,
}: {
  world: World;
  planners: { arm: Planner; background: Planner };
  resting: (own: Case) => number;
}) => {
  const state = {
    /** The cases on the pallets, as the engine knows them. */
    world,
    /** The obstacles the arm knows of. */
    obstacles: world.obstacles,
    /** Clicked cases waiting their turn, in order. */
    targets: [] as string[],
    job: null as Job | null,
    holding: null as Holding | null,
    riders: new Map<string, Rider>(),
    /** The cases to be moved out of the way of every case asked for, queued or under way. */
    clearing: new Set<string>(),
    /** Refused cases, each with the obstacles in its way. */
    parked: new Map<string, string[]>(),
  };

  let outbox: Event[] = [];
  let count = 0;
  // The straight leg the pad is on: where it began, and how far along.
  let leg: { from: Point; travelled: number } | null = null;
  // Whether the pad is on a case, so a plan from here rises straight out.
  let touching = false;
  // Holding a case with nowhere to take it, waiting for the cell to change.
  let halted = false;
  let changed = false;
  let asked = false;
  // Whether obstacles moved since refused cases were last tried again.
  let unsettled = false;
  /*
   * Cases put back in the queue for want of room on the buffer, and how many
   * turns in a row went that way; once every case in the queue has, none
   * can go, and they're refused.
   */
  const waiting = new Set<string>();
  let stalled = 0;
  // The plans the arm waits for, by the number each was asked with; a newer ask makes an older answer stale.
  const pending: {
    next: number | null;
    replan: number | null;
    rest: { token: number; move: number } | null;
  } = { next: null, replan: null, rest: null };

  const emit = (event: Event) => outbox.push(event);
  const note = (text: string, level: Level) =>
    emit({ type: 'note', text, level });

  /** Works out `clearing` again, after a click or once a case has moved. */
  const refresh = () => {
    const current = state.job;
    const asking = [...(current ? [current.target] : []), ...state.targets];

    state.clearing = new Set(
      asking.flatMap((target) =>
        state.world.cases[target]
          ? order(state.world, target).filter((id) => id !== target)
          : []
      )
    );
  };

  /**
   * A plan request for `target` from where the arm is. Coming down onto a
   * case or lifting off one, the pad is in that stack's column, next to its
   * neighbours, so a plan from there rises out as it would from the case.
   */
  const request = (target: string, frame: Frame): Request => {
    const current = state.job;
    const ease = current?.moves[current.move]?.waypoints[current.step]?.ease;

    return {
      world: { ...state.world, obstacles: state.obstacles },
      target,
      pad: frame.pad,
      facing: frame.facing,
      holding: state.holding?.own,
      reserved: state.targets.filter((id) => id !== target),
      touching: touching || ease === 'arrive' || ease === 'leave',
    };
  };

  /** Refuses `target`: it waits red, and what was in the way is lit. */
  const refuse = (target: string, { across, id, reason }: Refusal) => {
    state.parked.set(target, across);
    emit({ type: 'refuse', target, across });
    note(
      (reason === 'room'
        ? `No room on the buffer for ${label(id)}`
        : `No clear path for ${label(id)}`) +
        (across.length ? `: ${across.join(', ')} in the way` : '') +
        (id !== target ? `; ${label(target)} waits` : ''),
      'error'
    );
  };

  const begin = (target: string, moves: Move[]) => {
    state.job = { move: 0, moves, step: 0, target };
    leg = null;
  };

  const unpark = (target: string) => {
    state.parked.delete(target);
    emit({ type: 'unpark', target });
  };

  /** Tries the refused cases again, in the background: any with a way now go back in the queue. */
  const retry = (frame: Frame) =>
    [...state.parked.keys()].forEach((target) => {
      if (!state.world.cases[target]) {
        unpark(target);

        return;
      }

      planners.background.plan(request(target, frame), (plan) => {
        if ('moves' in plan && state.parked.has(target)) {
          unpark(target);
          state.targets.push(target);
          note(`Trying ${label(target)} again`, 'info');
        }
      });
    });

  /** Plans the job under way again from here; the arm holds till it's back. */
  const replan = (frame: Frame) => {
    const current = state.job;

    if (!current) {
      return;
    }

    const token = ++count;

    pending.replan = token;
    pending.rest = null;
    planners.arm.plan(request(current.target, frame), (plan) => {
      if (pending.replan !== token) {
        return;
      }

      pending.replan = null;

      if ('moves' in plan) {
        begin(current.target, plan.moves);

        if (halted) {
          halted = false;
          emit({ type: 'calm' });
          note('Found a way; carrying on', 'confirm');
        }
      } else if (state.holding) {
        // Holding a case with nowhere to take it: stop, and wait for the cell to change.
        if (!halted) {
          halted = true;
          emit({ type: 'alarm' });
          note('Stopped: no clear way on with the case', 'error');
        }
      } else {
        state.job = null;
        refuse(current.target, plan.refused);
      }
    });
  };

  /**
   * A case was asked for while the arm works: the moves after the one under
   * way are planned again from where it ends, so no case is set down on the
   * one asked for. The move under way carries on meanwhile, unless it's the
   * one that would bury it; then the arm holds and plans it all again.
   */
  const rethink = (frame: Frame) => {
    const current = state.job;
    const move = current?.moves[current.move];

    if (!current || !move || move.id === current.target) {
      return;
    }

    const own = state.holding?.own ?? state.world.cases[move.id];

    if (!own) {
      return;
    }

    const then = after(state.world, move, own);

    if (
      move.to === 'buffer' &&
      state.targets.some((id) =>
        over(then, id).some((above) => above.id === move.id)
      )
    ) {
      replan(frame);

      return;
    }

    const end = move.waypoints[move.waypoints.length - 1];
    const token = ++count;

    pending.rest = { token, move: current.move };
    planners.arm.plan(
      {
        world: { ...then, obstacles: state.obstacles },
        target: current.target,
        pad: end.target,
        facing: end.facing,
        reserved: state.targets.filter((id) => id !== current.target),
        touching: true,
      },
      (plan) => {
        if (pending.rest?.token !== token) {
          return;
        }

        pending.rest = null;

        // Refused from there: the plan under way is still clear, so it carries on.
        if ('moves' in plan && state.job === current) {
          state.job = {
            ...current,
            moves: [...current.moves.slice(0, current.move + 1), ...plan.moves],
          };
        }
      }
    );
  };

  /** Plans the next case asked for; the arm holds till it's back. */
  const next = (frame: Frame) => {
    const target = state.targets.shift();

    if (target === undefined || !state.world.cases[target]) {
      return;
    }

    const token = ++count;

    pending.next = token;
    planners.arm.plan(request(target, frame), (plan) => {
      if (pending.next !== token) {
        return;
      }

      pending.next = null;

      if (
        'refused' in plan &&
        plan.refused.reason === 'room' &&
        stalled < state.targets.length
      ) {
        // Others queued may make room, the belt taking cases off the buffer: this one waits its turn again.
        stalled += 1;
        state.targets.push(target);

        if (!waiting.has(target)) {
          waiting.add(target);
          note(`Case ${target} waits for room on the buffer`, 'info');
        }
      } else if ('refused' in plan) {
        // Not progress: the rest still waiting are refused in turn.
        waiting.delete(target);
        refuse(target, plan.refused);
      } else {
        stalled = 0;
        waiting.delete(target);
        plan.moves.forEach(({ id, to }) =>
          note(
            `Moving ${label(id)} to ${to === 'belt' ? 'the belt' : 'the buffer, out of the way'}`,
            to === 'belt' ? 'confirm' : 'warning'
          )
        );
        begin(target, plan.moves);
      }
    });
  };

  /** What happens when the pad reaches a waypoint that picks or sets down. */
  const act = (waypoint: Waypoint, move: Move, frame: Frame) => {
    // On a case now, so anything planned from here rises straight out.
    touching = true;

    if (waypoint.action === 'pick') {
      const own = state.world.cases[move.id];

      if (own) {
        // Its turn as it rests, less the pad's: it turns with the pad from here.
        state.holding = { own, yaw: resting(own) - frame.facing };
        state.world = remove(state.world, move.id);
        refresh();
        note(
          `Picked ${label(move.id)} from ${where(move.from)}`,
          move.to === 'belt' ? 'confirm' : 'warning'
        );
      }
    }

    if (waypoint.action === 'place' && state.holding) {
      const held = state.holding;

      if (move.to === 'belt') {
        state.riders.set(move.id, {
          yaw: held.yaw + frame.facing,
          z: move.at.z,
        });
      } else {
        state.world = place(
          {
            ...state.world,
            cases: { ...state.world.cases, [move.id]: held.own },
          },
          move.id,
          move.at,
          move.turned
        );
      }

      state.holding = null;
      refresh();
      note(
        `Set ${label(move.id)} down on ${where(move.at)}`,
        move.to === 'belt' ? 'confirm' : 'warning'
      );

      // A case set down changes the cell: a case refused for want of room or a way may have one now.
      retry(frame);
    }
  };

  /** Asks for `id` to go to the belt, after whatever's queued. */
  const ask = (id: string) => {
    if (
      !state.world.cases[id] ||
      state.targets.includes(id) ||
      state.job?.target === id
    ) {
      return;
    }

    if (state.parked.has(id)) {
      unpark(id);
    }

    state.targets.push(id);
    asked = true;
    refresh();

    const inWay = order(state.world, id).length - 1;

    note(
      `Queued ${label(id)} for the belt` +
        (inWay > 0 ? `, ${inWay} in the way first` : ''),
      'confirm'
    );
  };

  /** Tells the arm the obstacles it now knows of; `moved` when the operator moved one. */
  const sense = (obstacles: Solid[], moved: boolean) => {
    state.obstacles = obstacles;
    changed = true;
    unsettled ||= moved;
  };

  const frame = (input: Frame): Command => {
    const hold = () => ({
      target: input.pad,
      grip: state.holding ? 1 : 0,
      facing: input.facing,
    });

    /*
     * The belt carries what's on it off. Past the end, the belt takes it out
     * of the cell, the one place that does; here it only stops being moved.
     */
    state.riders.forEach((rider, id) => {
      rider.z += CONVEYOR.speed * Math.min(input.delta, 0.1);

      if (rider.z > CONVEYOR.end + 0.2) {
        state.riders.delete(id);
      }
    });

    // Once the operator stops moving obstacles, what was refused is tried again.
    if (unsettled && input.now - input.moved >= SETTLE) {
      unsettled = false;
      retry(input);
    }

    if (changed) {
      changed = false;

      const current = state.job;
      const blocked =
        halted ||
        (!!current &&
          !clears(
            current.moves,
            current,
            input.pad,
            state.holding?.own,
            state.world.cases,
            state.obstacles
          ));

      if (blocked) {
        replan(input);
      }
    }

    if (asked) {
      asked = false;

      if (pending.replan === null) {
        rethink(input);
      }
    }

    if (halted || pending.replan !== null || pending.next !== null) {
      return hold();
    }

    // Nothing under way: plan the next case asked for.
    if (!state.job) {
      next(input);

      return hold();
    }

    const current = state.job;

    // Past the move whose rest is being planned again: wait for it.
    if (pending.rest && current.move > pending.rest.move) {
      return hold();
    }

    const move = current.moves[current.move];
    const waypoint = move?.waypoints[current.step];

    if (!move || !waypoint) {
      state.job = null;

      return hold();
    }

    // Setting a case on the belt waits for the last one to move on.
    if (
      waypoint.action === 'place' &&
      move.to === 'belt' &&
      [...state.riders.values()].some(({ z }) => Math.abs(z - move.at.z) < ROOM)
    ) {
      return hold();
    }

    leg ??= { from: input.pad, travelled: 0 };

    const { from, travelled } = leg;
    const length = Math.hypot(
      waypoint.target.x - from.x,
      waypoint.target.y - from.y,
      waypoint.target.z - from.z
    );
    const ease = waypoint.ease === 'swing' ? 'via' : waypoint.ease;

    leg.travelled +=
      speed(ease, travelled, length - travelled) * Math.min(input.delta, 0.1);

    const command = {
      target: along(from, waypoint.target, leg.travelled),
      grip: state.holding ? 1 : 0,
      facing: waypoint.facing,
    };

    /*
     * There once it's in place and turned square, so it never comes down on
     * a case, or lets one go, at an angle. The pad lines up the same turned
     * half a turn, and the arm takes whichever is nearer, so a half turn out
     * counts as square.
     */
    const off = 2 * (input.facing - waypoint.facing);
    const there =
      leg.travelled >= length &&
      Math.hypot(
        input.pad.x - waypoint.target.x,
        input.pad.y - waypoint.target.y,
        input.pad.z - waypoint.target.z
      ) < ARRIVED &&
      Math.abs(Math.atan2(Math.sin(off), Math.cos(off))) / 2 < SQUARE;

    if (!there) {
      return command;
    }

    if (waypoint.action) {
      act(waypoint, move, input);
    } else if (waypoint.ease === 'swing') {
      touching = false;
    }

    leg = null;

    const step =
      current.step + 1 < move.waypoints.length
        ? { ...current, step: current.step + 1 }
        : { ...current, move: current.move + 1, step: 0 };

    // The job may have been planned again meanwhile; only move on through the one this was.
    if (state.job === current) {
      state.job = step.move < current.moves.length ? step : null;
    }

    return command;
  };

  /** What happened since this was last called. */
  const flush = () => {
    const events = outbox;

    outbox = [];

    return events;
  };

  /** Whether the arm has work: a case on the pad, a job, or any queued. */
  const busy = () =>
    state.targets.length > 0 ||
    state.job !== null ||
    state.holding !== null ||
    pending.next !== null;

  return { ask, busy, flush, frame, sense, state };
};

type Conductor = ReturnType<typeof conduct>;

export {
  conduct,
  type Command,
  type Conductor,
  type Event,
  type Frame,
  type Holding,
  type Job,
  type Planner,
  type Request,
  type Rider,
};
