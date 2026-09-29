// Grid
import { alongBelt, own, slot } from '../grid/layout';
import { SIDES } from '../grid/hex';

// Constants
import { LOOKOUT, ROOM } from './constants';

// Model
import { inside } from '../model/kinematics';

// Partials
import { instructions, order, plan, type Reserved } from './planner';
import {
  type Job,
  label,
  note,
  type Order,
  say,
  send,
  type Station,
  title,
  world,
} from './state';
import { over, place, remove } from './world';

// Spec
import {
  BUFFER,
  type Case,
  HERE,
  type Move,
  type Refusal,
  stays,
  type World,
} from './spec';

/** Where a move puts its case, for the log. */
const where = (to: string) =>
  to === BUFFER
    ? 'on the buffer, out of the way'
    : to === HERE
      ? 'on its own pallet'
      : 'on the belt';

/** The instruction the arm is on, from its telemetry: none until it reports on the plan it was last sent. */
const current = ({ job, telemetry }: Station) =>
  job && telemetry?.revision === job.revision ? telemetry.step : undefined;

/** The move and waypoint the arm is on, from its telemetry. */
const at = (station: Station) => {
  const { job } = station;
  const step = Math.min(current(station) ?? 0, (job?.owners.length ?? 1) - 1);

  return job?.owners[step] ?? { move: 0, step: 0 };
};

/** The cases queued besides `except`, each with its belt. */
const reserved = (station: Station, except: string): Reserved =>
  Object.fromEntries(
    station.queue
      .filter(({ target }) => target !== except)
      .map(({ belt, target }) => [target, belt ?? station.outbound])
  );

/** A plan for `order` from where the arm is now. */
const request = (station: Station, order: Order) => {
  const { pad } = station.telemetry!;

  return plan(
    station.layout,
    world(station),
    { ...order, onto: station.outbound },
    inside(pad.at),
    {
      facing: pad.facing,
      holding: station.holding ?? undefined,
      reserved: reserved(station, order.target),
      touching: station.touching,
    }
  );
};

/** The cell after `move`, its case set down; `own` it already off the pallet. */
const after = (cell: World, move: Move, own: Case): World => {
  const lifted = remove(cell, move.id);

  return stays(move.to)
    ? place(
        { ...lifted, cases: { ...lifted.cases, [move.id]: own } },
        move.id,
        move.at,
        move.facing
      )
    : lifted;
};

/** Sends `moves` to the arm as the job for `order`, from instruction `skip` on. */
const dispatch = (station: Station, order: Order, moves: Move[], skip = 0) => {
  const made = instructions(moves);
  const job: Job = {
    ...order,
    moves,
    steps: made.steps.slice(skip),
    acts: made.acts
      .filter(({ step }) => step >= skip)
      .map((act) => ({ ...act, step: act.step - skip })),
    owners: made.owners.slice(skip),
    skip,
    revision: 0,
    opened: new Set(),
  };

  job.revision = send(station, job.steps);
  station.job = job;
};

/** Takes the arm's plan away: it stops where it is. */
const cancel = (station: Station) => {
  send(station, []);
  station.job = null;
};

/** Refuses `order`: it waits, and what was in the way is lit. */
const refuse = (
  station: Station,
  { belt, of, target, to }: Order,
  { across, id, reason }: Refusal
) => {
  station.parked.set(target, { across, belt, of, to });
  say(station, { type: 'refuse', target, across });
  note(
    station,
    reason === 'room'
      ? `No room on the buffer for ${label(id)}`
      : `No clear path for ${label(id)}`,
    'error',
    [
      across.length ? `${across.join(', ')} in the way` : '',
      id !== target ? `${label(target)} waits` : '',
    ]
      .filter(Boolean)
      .join('; ') || undefined
  );
};

const unpark = (station: Station, target: string) => {
  station.parked.delete(target);
  say(station, { type: 'unpark', target });
};

/** Tries the refused cases again: any with a way now go back in the queue. */
const retry = (station: Station) => {
  if (!station.telemetry) {
    return;
  }

  station.parked.forEach(({ belt, of, to }, target) => {
    if (!station.cases[target]) {
      return unpark(station, target);
    }

    if ('moves' in request(station, { belt, target, of, to })) {
      unpark(station, target);
      station.queue.push({ belt, target, of, to });
      note(station, `Trying ${label(target)} again`, 'info');
    }
  });
};

/** Whether a refusal means a pallet has no place left: none at all, or none the arm can get a case into past what's stacked. */
const full = ({ across, reason }: Refusal) =>
  reason === 'room' || (reason === 'way' && !across.length);

/** Plans the next order; the arm waits till it's told. */
const next = (station: Station) => {
  if (station.job || station.halted || !station.telemetry) {
    return;
  }

  const order = station.queue.shift();

  if (!order || !station.cases[order.target]) {
    return;
  }

  const found = request(station, order);

  // Its pallets here are full: a pallet goes on the next free slot and it goes again, or there's none and it stops.
  if (
    'refused' in found &&
    full(found.refused) &&
    order.belt === null &&
    found.refused.id === order.target
  ) {
    station.queue.unshift(order);

    if (!spread(station)) {
      stop(station);
    }

    return;
  }

  if (
    'refused' in found &&
    found.refused.reason === 'room' &&
    station.stalled < station.queue.length
  ) {
    // Others queued may make room, the belt taking cases off the buffer: this one waits its turn again.
    station.stalled += 1;
    station.queue.push(order);

    if (!station.waiting.has(order.target)) {
      station.waiting.add(order.target);
      note(
        station,
        `${title(order.target)} waits`,
        'info',
        'for room on the buffer'
      );
    }
  } else if ('refused' in found) {
    station.waiting.delete(order.target);
    refuse(station, order, found.refused);
  } else {
    station.stalled = 0;
    station.waiting.delete(order.target);
    found.moves.forEach(({ id, to }) =>
      note(
        station,
        `${label(id)}`,
        to === BUFFER ? 'warning' : 'confirm',
        where(to)
      )
    );
    dispatch(station, order, found.moves);
  }
};

/**
 * Sets a pallet of this cell's own on the next free slot, for the cases
 * that arrive here. Says whether there was one: the arm fills its slots
 * one pallet at a time, and stops when the last is full.
 */
const spread = (station: Station) => {
  const side = SIDES.find(
    (each) => own(station.layout, each) && !station.taken.has(each)
  );

  if (side === undefined) {
    return false;
  }

  const at = slot(side);

  station.layout.pallets.push({
    id: `${station.id}-out-${station.outbound.length + 1}`,
    side,
    at,
  });
  station.outbound.push(at);
  say(station, { type: 'pallet', at });
  note(station, `new pallet on slot ${side}`, 'info', 'case arrival');

  return true;
};

/** Stops the arm for good, alarm on: every slot has a full pallet, and there's nowhere to put the next case. */
const stop = (station: Station) => {
  if (station.halted) {
    return;
  }

  station.halted = true;
  say(station, { type: 'alarm' });
  note(station, 'Stopped', 'error', 'no slot left for another pallet');
};

/** Lets the arm go on, unless the hub holds the whole floor. */
const resume = (station: Station) => {
  if (!station.paused) {
    station.link.send({ type: 'resume', arm: station.id });
  }
};

/** Plans the job under way again from where the arm is; the arm holds till it's back. */
const replan = (station: Station) => {
  const job = station.job;

  if (!job || !station.telemetry) {
    return;
  }

  // Its case is down and the arm is only coming away from the belt: nothing left to plan.
  if (!station.holding && !station.cases[job.target]) {
    return;
  }

  station.link.send({ type: 'hold', arm: station.id });

  const found = request(station, job);

  if ('moves' in found) {
    dispatch(station, job, found.moves);
    resume(station);

    if (station.halted) {
      station.halted = false;
      say(station, { type: 'calm' });
      note(station, 'Found a way', 'confirm', 'carrying on');
    }
  } else if (station.holding) {
    // Holding a case with nowhere to take it: stay held, and wait for the cell to change.
    if (!station.halted) {
      station.halted = true;
      say(station, { type: 'alarm' });
      note(station, 'Stopped', 'error', 'no clear way on with the case');
    }
  } else {
    cancel(station);
    refuse(station, job, found.refused);
    resume(station);
  }
};

/**
 * An order came in while the arm works: the moves after the one under way
 * are planned again from where it ends, so no case is set down on the one
 * asked for. The move under way carries on meanwhile, unless it's the one
 * that would bury it; then the arm holds and plans it all again.
 */
const rethink = (station: Station) => {
  const job = station.job;
  const step = current(station);

  if (!job || step === undefined) {
    return;
  }

  const { move: index } = at(station);
  const move = job.moves[index];

  if (!move || move.id === job.target) {
    return;
  }

  const own = station.holding ?? station.cases[move.id];

  if (!own) {
    return;
  }

  const then = after(world(station), move, own);

  if (
    stays(move.to) &&
    station.queue.some(({ target }) =>
      over(then, target).some((above) => above.id === move.id)
    )
  ) {
    return replan(station);
  }

  const end = move.waypoints[move.waypoints.length - 1];
  const rest = plan(
    station.layout,
    then,
    { ...job, onto: station.outbound },
    end.target,
    {
      facing: end.facing,
      reserved: reserved(station, job.target),
      touching: true,
    }
  );

  // Refused from there: the plan under way is still clear, so it carries on.
  if ('moves' in rest) {
    dispatch(
      station,
      job,
      [...job.moves.slice(0, index + 1), ...rest.moves],
      job.skip + step
    );
  }
};

/**
 * Whether a rider on `belt`, other than `except`, is within `ROOM` of `drop`
 * either way, or within `behind` of it coming: only while the belt runs, as
 * a case on a stopped belt isn't coming.
 */
const traffic = (
  station: Station,
  belt: string,
  drop: number,
  behind: number,
  except: string
) =>
  [...station.riders.values()].some(
    (rider) =>
      rider.belt === belt &&
      rider.id !== except &&
      rider.distance - drop < ROOM &&
      drop - rider.distance < (station.moving.has(belt) ? behind : ROOM)
  );

/**
 * Sends the arm back up to the gate: the plan from the gate on goes out
 * again, with a move up to where it waited first, so it comes down again
 * only once the belt is clear.
 */
const retreat = (station: Station, job: Job, gate: number) => {
  const up = job.steps[gate - 1];

  if (up?.do !== 'move') {
    return;
  }

  const shift = gate - 1;

  job.steps = [{ ...up }, ...job.steps.slice(gate)];
  job.owners = [job.owners[shift], ...job.owners.slice(gate)];
  job.acts = job.acts
    .filter(({ step }) => step >= gate)
    .map((act) => ({ ...act, step: act.step - shift }));
  job.skip += shift;
  job.opened.clear();
  job.revision = send(station, job.steps);
  note(
    station,
    'Back up',
    'warning',
    'a case is coming along the belt under the drop'
  );
};

/**
 * Minds the belt while the arm sets a case on it. At the gate above the
 * belt, the arm waits until nothing is under the drop or coming up to it
 * in the time it takes to come down and let go. On its way down, a case
 * that comes along anyway sends it back up to wait again.
 */
const gates = (station: Station) => {
  const job = station.job;
  const step = current(station);

  if (!job || step === undefined) {
    return;
  }

  const waiting = job.steps[step];
  const gate = job.acts.find(
    (one) =>
      one.action === 'gate' &&
      one.step <= step &&
      job.owners[one.step].move === job.owners[step]?.move
  );
  const place =
    gate &&
    job.acts.find((one) => one.action === 'place' && one.move === gate.move);

  if (!gate || !place || place.step < step) {
    return;
  }

  const line = station.layout.belts.find((one) => one.id === gate.move.to);
  const drop = line ? alongBelt(line, gate.move.at) : 0;

  if (waiting?.do === 'gate') {
    if (
      !job.opened.has(waiting.id) &&
      !traffic(station, gate.move.to, drop, LOOKOUT, gate.move.id)
    ) {
      job.opened.add(waiting.id);
      station.link.send({ type: 'open', arm: station.id, gate: waiting.id });
    }

    return;
  }

  // On the way down, and not yet letting go: a case coming under sends it back up.
  if (
    step < place.step &&
    traffic(station, gate.move.to, drop, ROOM, gate.move.id)
  ) {
    retreat(station, job, gate.step);
  }
};

/** How many cases stand in the way of `target`. */
const inWay = (station: Station, target: string) =>
  order(world(station), target).length - 1;

export {
  at,
  cancel,
  gates,
  inWay,
  next,
  replan,
  rethink,
  retry,
  spread,
  stop,
  unpark,
};
