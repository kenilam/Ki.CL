// Protocol
import type { Box, Link } from '../protocol';

// Model
import { hitting } from '../model/body';
import { REST } from '../model/constants';
import { ceiling, inside } from '../model/kinematics';

// Grid
import { childCentre } from '../grid/child';
import { centre, type Hex, index, type Side } from '../grid/hex';
import {
  alongBelt,
  free,
  type Layout,
  onBelt,
  slot,
  SLOT,
} from '../grid/layout';

// Hub
import type { Board, Capacity, Target } from '../hub/board';

// Constants
import { ROOM, SETTLE } from './constants';

// Partials
import { at, gates, next, replan, rethink, retry, spread, stop } from './jobs';
import { transfer } from './motion';
import { clears, instructions } from './planner';
import { handle } from './reports';
import {
  boot,
  known,
  label,
  note,
  say,
  send,
  show,
  type Station as State,
  title,
  world,
} from './state';
import { cases as standing, extent } from './world';

// Events
import type { Rider } from './events';

/** How far a pallet's centre may be off a slot's and still stand on it, in metres. */
const ONSLOT = 0.05;

/** How far before the pick zone a case is when the end arm moves over the zone to meet it, in metres. */
const COMING = 2.5;

/** How high above the belt the end arm waits for a case, in metres. */
const HOVER = 0.9;

/** The tallest case that rides a belt, in metres: a held case above that is out of the way of the next. */
const TALLEST = 0.45;

/** A pallet this arm is working: its slot, and the plan version it last read. */
type Claim = { side: Side; version: number };

/**
 * Whether an obstacle stands in the arm as it is posed now, with what it
 * holds. Going from clear to struck sets the alarm off; going back clears
 * it, unless the arm is halted for another reason.
 */
const strike = (station: State) => {
  const { holding, telemetry } = station;

  if (!telemetry) {
    return;
  }

  const carried = holding
    ? {
        size: holding.size,
        yaw: 0,
        offset: { x: 0, y: -holding.size[1] / 2, z: 0 },
      }
    : undefined;
  const now = hitting(telemetry.joints, carried, station.catalogue).map(
    ({ id }) => id
  );
  const was = station.struck;

  if (now.join() === was.join()) {
    return;
  }

  station.struck = now;
  say(station, { type: 'struck', obstacles: now });

  if (now.length && !was.length) {
    say(station, { type: 'alarm' });
    note(station, `Struck by ${now.join(', ')}`, 'error', 'move it clear');
  } else if (!now.length && was.length) {
    note(station, 'Clear again', 'confirm', 'carrying on');

    if (!station.halted) {
      say(station, { type: 'calm' });
    }
  }
};

/**
 * The software fitted to one arm: its picture of the cell round it, the
 * planner that turns a pallet's queue into jobs, and the wire to its
 * controller. It reads the board itself, picks up the pallets on its slots
 * that it has capacity for, works out drop and way for each case onto the
 * belt line past it, and puts a pallet back when its queue is done. At the
 * end of a line it takes what arrives off the belt onto pallets of its
 * own, one on each free slot in turn; with the last one full it stops,
 * alarm on, and the hub holds the whole floor.
 */
const create = ({
  id,
  hex,
  layout,
  link,
  capacity = { targets: 1, period: 60 },
}: {
  id: string;
  hex: Hex;
  layout: Layout;
  link: Link;
  capacity?: Capacity;
}) => {
  const station = boot(id, layout, link);
  const unlisten = link.listen((report) => handle(station, report));
  const claims = new Map<string, Claim>();
  const taken: number[] = [];
  /** Pallets left where they are for want of a belt, so the log says so once. */
  const stuck = new Set<string>();
  let limit = capacity;
  /** Whether the arm has been sent over the pick zone to meet what's coming. */
  let staged = false;
  /** Whether the arm had nothing to do, as last said. */
  let idled = false;

  /** How many pallets this arm may still pick up in the current period. */
  const remaining = () =>
    limit.targets -
    taken.filter((when) => station.clock - when < limit.period).length;

  /** The belt line past here that goes on to `to`, if one does. */
  const route = (to: Hex) =>
    layout.belts.find(({ downstream }) =>
      downstream.some((cell) => index(cell) === index(to))
    );

  /** The slot a target's pallet stands on, if it stands on one of this arm's. */
  const slotOf = (target: Target) => {
    const own = centre(hex);
    const there = childCentre(target.at);
    const local = { x: there.x - own.x, z: there.z - own.z };

    return ([0, 1, 2, 3, 4, 5] as Side[]).find((side) => {
      const [x, , z] = slot(side);

      return Math.hypot(x - local.x, z - local.z) < ONSLOT;
    });
  };

  /** Queues the target's cases still to go, in its order, each onto the belt toward its cell. */
  const requeue = (target: Target, claim: Claim) => {
    const belt = route(target.to);
    const kept = station.queue.filter((order) => order.of !== target.id);

    if (!belt) {
      note(
        station,
        `No belt past ${id} toward cell ${target.to.q},${target.to.r}`,
        'error'
      );

      return;
    }

    const orders = target.queue
      .filter((one) => station.cases[one] && station.job?.target !== one)
      .map((one) => ({ target: one, belt, of: target.id, to: target.to }));

    station.queue = [...kept, ...orders];
    claim.version = target.version;

    if (station.job) {
      rethink(station);
    }
  };

  /** Takes a pallet onto its slot: its cases come into this arm's frame. */
  const attach = (target: Target, side: Side) => {
    const [x, y, z] = slot(side);

    layout.pallets.push({ id: target.id, side, at: [x, y, z] });
    target.cases.forEach((one) => {
      station.cases[one.id] = {
        ...one,
        at: { x: one.at.x + x, y: one.at.y + y, z: one.at.z + z },
      };
    });

    const claim: Claim = { side, version: -1 };

    claims.set(target.id, claim);
    taken.push(station.clock);
    note(
      station,
      `pallet ${target.id}`,
      'info',
      `${target.queue.length} remains`
    );
    requeue(target, claim);
    show(station);
  };

  /** Puts a pallet back: what still stands on it goes with it, relative to its centre. */
  const detach = (target: Target, board: Board) => {
    const claim = claims.get(target.id);

    if (!claim) {
      return;
    }

    const [x, y, z] = slot(claim.side);
    const left = Object.values(station.cases).filter(
      (one) => Math.abs(one.at.x - x) < 0.75 && Math.abs(one.at.z - z) < 0.75
    );

    left.forEach((one) => delete station.cases[one.id]);
    layout.pallets.splice(
      layout.pallets.findIndex((one) => one.id === target.id),
      1
    );
    claims.delete(target.id);
    station.queue = station.queue.filter((order) => order.of !== target.id);
    board.release(
      target.id,
      left.map((one) => ({
        ...one,
        at: { x: one.at.x - x, y: one.at.y - y, z: one.at.z - z },
      })),
      // Only what still stands on the pallet is left to send; the rest went out or waits on the buffer.
      target.queue.filter((one) => left.some(({ id: kept }) => kept === one))
    );
    note(station, `Put pallet ${target.id} back`, 'info');
    show(station);
  };

  /** Reads the board: picks up what it can reach and has capacity for, follows plans that changed, puts back what is done. */
  const pick = (board: Board) => {
    station.taken = new Set(
      board
        .targets()
        .map(slotOf)
        .filter((side): side is Side => side !== undefined)
    );

    for (const target of board.targets()) {
      const claim = claims.get(target.id);

      if (claim) {
        const busy =
          station.queue.some((order) => order.of === target.id) ||
          (!!station.job && target.queue.includes(station.job.target));

        if (target.version !== claim.version) {
          requeue(target, claim);
        } else if (!busy) {
          detach(target, board);
        }

        continue;
      }

      if (target.claimed || !target.queue.length || remaining() <= 0) {
        continue;
      }

      const side = slotOf(target);

      if (side === undefined || !free(layout, side)) {
        continue;
      }

      // No belt that way: the pallet is left for an arm that has one, and said once.
      if (!route(target.to)) {
        if (!stuck.has(target.id)) {
          stuck.add(target.id);
          note(
            station,
            `Leaving pallet ${target.id}`,
            'error',
            `no belt past ${id} toward cell ${target.to.q},${target.to.r}`
          );
        }

        continue;
      }

      const got = board.claim(target.id, id);

      if (got) {
        attach(got, side);
      }
    }
  };

  /** Sets how many pallets this arm may pick up per period. */
  const configure = (next: Capacity) => {
    limit = next;
  };

  /** Holds the arm where it is while an alarm is on somewhere on the floor, and lets it go on after. */
  const pause = (on: boolean) => {
    if (station.paused === on) {
      return;
    }

    station.paused = on;
    link.send({ type: on ? 'hold' : 'resume', arm: id });
  };

  /** Sends `target` off on belt `line`, after whatever is queued; `to` is the cell it's bound for, if known. */
  const order = (target: string, line: string, to: Hex | null = null) => {
    const belt = layout.belts.find((one) => one.id === line);

    if (!belt) {
      note(station, `No belt ${line} past ${id}`, 'error');

      return false;
    }

    if (
      !station.cases[target] ||
      station.queue.some((queued) => queued.target === target) ||
      station.job?.target === target
    ) {
      return false;
    }

    station.queue.push({ belt, target, of: null, to });
    note(station, `Queued ${label(target)}`, 'confirm', 'for the belt');

    if (station.job) {
      rethink(station);
    }

    return true;
  };

  /** Starts over with `catalogue` the obstacles the cell may hold, the arm sent home. */
  const load = (catalogue: Box[]) => {
    claims.clear();
    stuck.clear();
    layout.pallets.splice(0);
    station.outbound = [];
    station.cases = {};
    station.catalogue = catalogue;
    station.sensed.clear();
    station.riders.clear();
    station.moving.clear();
    station.queue = [];
    station.job = null;
    station.holding = null;
    station.touching = false;
    station.halted = false;
    station.paused = false;
    station.parked.clear();
    station.waiting.clear();
    station.stalled = 0;
    link.send({ type: 'stop', arm: id });
    link.send({ type: 'reset', arm: id });
    station.revision += 1;
    link.send({
      type: 'load',
      arm: id,
      plan: {
        arm: id,
        revision: station.revision,
        holding: null,
        known: known(station).map((box) => box.id),
        instructions: [
          { do: 'move', to: { at: REST, facing: 0 }, ease: 'swing' },
        ],
      },
    });
    show(station);
  };

  /**
   * The obstacles as they stand now; `moved` when the operator moved one.
   * One put into the arm as it is posed sets the alarm off, till it's
   * moved clear again.
   */
  const obstacles = (catalogue: Box[], moved: boolean) => {
    station.catalogue = catalogue;
    station.sensed = new Set(
      [...station.sensed].filter((seen) =>
        catalogue.some((box) => box.id === seen)
      )
    );
    station.dirty = true;

    if (moved) {
      station.moved = station.clock;
      station.unsettled = true;
    }

    strike(station);
  };

  /** The belts with a case standing in their pick zone here, waiting for this arm: the whole line stops for it. */
  const blocked = () =>
    layout.belts
      .filter((belt) => belt.end)
      .filter((belt) => {
        const point = onBelt(belt, belt.pick);

        return Object.values(station.cases).some(
          (one) => Math.hypot(one.at.x - point.x, one.at.z - point.z) < ROOM
        );
      })
      .map(({ id: belt }) => belt);

  /** Whether this arm could take a case off `belt` now: at the end of it, free, and nothing standing in its pick zone. */
  /**
   * Whether nothing is in this arm's pick zone on `belt`, so a case may ride
   * into it: no case standing there, and no case held low over it while the
   * arm lifts it away. Once the held case is up above what rides the belt,
   * the next one may come on.
   */
  const clear = (belt: string) => {
    const found = layout.belts.find((one) => one.id === belt && one.end);

    if (!found) {
      return true;
    }

    const point = onBelt(found, found.pick);
    const standing = Object.values(station.cases).some(
      (one) => Math.hypot(one.at.x - point.x, one.at.z - point.z) < ROOM
    );
    const pad = station.telemetry?.pad.at;
    const low =
      !!station.holding &&
      !!pad &&
      Math.abs(alongBelt(found, pad) - found.pick) < ROOM &&
      pad.y - station.holding.size[1] < found.height + TALLEST;

    return !standing && !low;
  };

  /** Whether this arm could take a case off `belt` now: at the end of it, free, and its pick zone clear. */
  const ready = (belt: string) =>
    layout.belts.some((one) => one.id === belt && one.end) &&
    !station.halted &&
    !station.job &&
    !station.queue.length &&
    !station.holding &&
    clear(belt);

  /**
   * A case the belt has brought to the pick zone at the end of the line.
   * It comes off onto a pallet of this cell's own, set down for it if
   * there's none yet, once the arm has taken the last one away. Says
   * whether it was taken; otherwise it waits on the belt.
   */
  const receive = (rider: Rider) => {
    const belt = layout.belts.find((one) => one.id === rider.belt && one.end);

    if (!belt) {
      return false;
    }

    // Only when free to take it now: another arm at the end may be, and the belt goes on to it.
    if (!ready(belt.id)) {
      return false;
    }

    const point = onBelt(belt, belt.pick);

    if (!station.outbound.length && !spread(station)) {
      stop(station);

      return false;
    }

    station.cases[rider.id] = {
      ...rider.own,
      at: { ...point, y: belt.height + rider.own.size[1] / 2 },
      yaw: rider.yaw,
    };
    station.queue.push({ target: rider.id, belt: null, of: null, to: hex });
    note(
      station,
      `${title(rider.id)} arrived`,
      'info',
      'taking it off the belt'
    );
    show(station);

    return true;
  };

  /**
   * At the end of a line, an idle arm moves over the pick zone while a case
   * is on its way to it, so it lifts it off as soon as it arrives and the
   * line stands still no longer than it must.
   */
  const stage = () => {
    const belt = layout.belts.find((one) => one.end);

    if (
      !belt ||
      station.halted ||
      station.job ||
      station.queue.length ||
      station.holding ||
      !station.telemetry
    ) {
      staged = false;

      return;
    }

    const coming = [...station.riders.values()].some(
      (rider) => rider.belt === belt.id && rider.distance > belt.pick - COMING
    );

    if (coming && !staged) {
      const point = onBelt(belt, belt.pick);
      // No higher than the arm can hold the pad over that point.
      const y = Math.min(belt.height + HOVER, ceiling(point) - 0.05);
      const { pad } = station.telemetry;
      const others = standing(world(station)).map((one) => ({
        id: one.id,
        ...extent(one),
      }));
      // The planned way round, clear of the stacks, as any move is.
      const way = transfer(
        inside(pad.at),
        { x: point.x, y, z: point.z },
        [pad.facing, 0],
        undefined,
        { cases: others, obstacles: known(station) },
        Math.max(0, ...others.map(({ max }) => max.y), belt.height + 0.45),
        { rise: station.touching, fall: false }
      );

      staged = true;

      if ('waypoints' in way) {
        send(
          station,
          instructions([
            {
              id: '',
              to: '',
              from: pad.at,
              at: point,
              facing: 0,
              waypoints: way.waypoints,
            },
          ]).steps
        );
        note(station, 'swag to the belt', 'info', 'case arrival');
      }
    } else if (!coming) {
      staged = false;
    }
  };

  /**
   * One step of `dt` seconds. `riders` is what the hub says rides the belts
   * past here, distances from this arm, and `moving` which of those belts run.
   */
  const tick = (
    dt: number,
    board?: Board,
    riders: Rider[] = [],
    moving: string[] = []
  ) => {
    station.clock += dt;
    station.riders = new Map(riders.map((rider) => [rider.id, rider]));
    station.moving = new Set(moving);

    if (station.unsettled && station.clock - station.moved >= SETTLE) {
      station.unsettled = false;
      retry(station);
    }

    if (station.resend) {
      station.resend = false;
      replan(station);
    }

    if (station.dirty) {
      station.dirty = false;

      const { job, telemetry } = station;

      if (
        job &&
        telemetry &&
        (station.halted ||
          !clears(
            job.moves,
            at(station),
            telemetry.pad.at,
            station.holding ?? undefined,
            station.cases,
            known(station)
          ))
      ) {
        replan(station);
      }
    }

    if (board && station.telemetry) {
      pick(board);
    }

    next(station);
    stage();
    gates(station);

    // Nothing queued, under way, held or picked up, and not stopped: said once each way.
    const idle =
      !station.halted &&
      !station.job &&
      !station.queue.length &&
      !station.holding &&
      !claims.size;

    if (idle !== idled) {
      idled = idle;
      say(station, { type: 'idle', idle });
    }
  };

  /** The events since last asked. */
  const drain = () => {
    const out = station.events;

    station.events = [];

    return out;
  };

  const snapshot = () => ({
    cases: station.cases,
    holding: station.holding,
    pad: station.telemetry?.pad ?? null,
    riders: [...station.riders.values()],
    queue: station.queue.map(({ target }) => target),
    parked: [...station.parked.keys()],
    job: station.job?.target ?? null,
    claims: [...claims.keys()],
    capacity: limit,
  });

  const close = () => {
    unlisten();
    link.close();
  };

  return {
    id,
    hex,
    layout,
    blocked,
    close,
    configure,
    drain,
    load,
    obstacles,
    clear,
    order,
    pause,
    ready,
    receive,
    snapshot,
    tick,
  };
};

type Station = ReturnType<typeof create>;

export { SLOT, create };
export type { Station };
