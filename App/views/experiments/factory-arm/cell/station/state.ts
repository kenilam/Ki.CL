// Protocol
import type { Box, Instruction, Link, Telemetry } from '../protocol';

// Grid
import type { Hex, Side } from '../grid/hex';
import type { Belt, Layout, Vector } from '../grid/layout';

// Partials
import type { instructions } from './planner';
import { vision } from './vision';

// Events
import type { Event, Level, Rider } from './events';

// Spec
import type { Case, Move, World } from './spec';

/**
 * A case asked for: the belt it leaves by, or none when it stays here and
 * goes onto this cell's own pallets; the cell it's bound for; and the
 * pallet whose plan asked, if one did.
 */
type Order = {
  target: string;
  belt: Belt | null;
  to: Hex | null;
  of: string | null;
};

/** A job under way: what was asked for, the moves that do it, and how the arm was told. */
type Job = Order &
  ReturnType<typeof instructions> & {
    moves: Move[];
    /** How many of the moves' instructions the arm was past when this was sent. */
    skip: number;
    revision: number;
    /** Gates already opened, so the arm isn't told twice. */
    opened: Set<string>;
  };

/** Everything the station keeps between ticks. */
type Station = {
  id: string;
  layout: Layout;
  link: Link;
  telemetry: Telemetry | null;
  cases: Record<string, Case>;
  /** Every obstacle the cell may hold, whether or not the station knows of it yet. */
  catalogue: Box[];
  /** Obstacles the arm's sensors have found. The overhead camera's are worked out as needed. */
  sensed: Set<string>;
  /** What rides the belts past here, as the hub last said, distances from this arm. */
  riders: Map<string, Rider>;
  /** The belts past here that are running, as the hub last said. */
  moving: Set<string>;
  /** Orders waiting their turn. */
  queue: Order[];
  /** Pallets of this cell's own, where cases that arrive here are stacked. */
  outbound: Vector[];
  /** The slots the board has pallets on, claimed or not, so nothing of the cell's own goes there. */
  taken: Set<Side>;
  job: Job | null;
  holding: Case | null;
  /** Whether the pad is on a case, so a plan from here rises straight out. */
  touching: boolean;
  /** Stopped with the alarm on: holding a case with nowhere to take it, till the cell changes; or no slot left for another pallet, for good. */
  halted: boolean;
  /** Held by the hub while an arm somewhere on the floor has its alarm on. */
  paused: boolean;
  /** Obstacles standing in the arm as it is posed: the alarm is on till they are moved clear. */
  struck: string[];
  /** Refused cases, each with the obstacles in its way and the belt it was bound for. */
  parked: Map<
    string,
    { across: string[]; belt: Belt | null; of: string | null; to: Hex | null }
  >;
  /** Cases sent back in the queue for want of room, and how many turns in a row went that way. */
  waiting: Set<string>;
  stalled: number;
  /** The last revision sent; every plan goes out as the next one. */
  revision: number;
  /** Something changed that the job under way should be checked against. */
  dirty: boolean;
  /** The arm refused the last plan: it's planned again from where the arm is. */
  resend: boolean;
  events: Event[];
  clock: number;
  /** When the operator last moved an obstacle, and whether refused cases have been tried since. */
  moved: number;
  unsettled: boolean;
};

const boot = (id: string, layout: Layout, link: Link): Station => ({
  id,
  layout,
  link,
  telemetry: null,
  cases: {},
  catalogue: [],
  sensed: new Set(),
  riders: new Map(),
  moving: new Set(),
  queue: [],
  outbound: [],
  taken: new Set(),
  job: null,
  holding: null,
  touching: false,
  halted: false,
  struck: [],
  paused: false,
  parked: new Map(),
  waiting: new Set(),
  stalled: 0,
  revision: 0,
  dirty: false,
  resend: false,
  events: [],
  clock: 0,
  moved: 0,
  unsettled: false,
});

const say = (station: Station, event: Event) => station.events.push(event);

const note = (station: Station, text: string, level: Level, detail?: string) =>
  say(station, { type: 'note', text, level, detail });

/** The obstacles the station knows of: what the camera sees, and what the arm has found. */
const known = (station: Station) => {
  const seen = new Set([
    ...vision(station.layout, station.catalogue),
    ...station.sensed,
  ]);

  return station.catalogue.filter(({ id }) => seen.has(id));
};

/** The cell as the planner takes it. */
const world = (station: Station): World => ({
  cases: station.cases,
  obstacles: known(station),
});

/** Tells the watchers where every case is now. */
const show = (station: Station) =>
  say(station, {
    type: 'cell',
    cases: Object.values(station.cases),
    holding: station.holding,
    riders: [...station.riders.values()],
  });

/** Sends the arm `steps` as the next revision, with what it holds and what the station knows. */
const send = (station: Station, steps: Instruction[]) => {
  station.revision += 1;
  station.link.send({
    type: 'load',
    arm: station.id,
    plan: {
      arm: station.id,
      revision: station.revision,
      holding: station.holding?.id ?? null,
      known: known(station).map(({ id }) => id),
      instructions: steps,
    },
  });

  return station.revision;
};

/** How a case reads in the log, and at the start of a line. */
const label = (id: string) => `case ${id}`;
const title = (id: string) => `Case ${id}`;

export { boot, known, label, note, say, send, show, title, world };
export type { Job, Order, Station };
