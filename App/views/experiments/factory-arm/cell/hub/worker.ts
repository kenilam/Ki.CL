// Protocol
import type { Box } from '../protocol';

// Controller
import { connect } from '../controller/link';

// Grid
import type { Hex } from '../grid/hex';
import type { Layout, Line as Geometry } from '../grid/layout';

// Station
import type { Event } from '../station/events';

// Partials
import type { Capacity, Target } from './board';
import { type Cell, create, type Hub, type Line, type Riding } from './hub';

/** How often the hub runs its stations, in milliseconds. */
const WAKE = 1000 / 30;

/**
 * What the console sends the hub. `scene` is the simulation's side door:
 * the boxes an arm's sensors would meet, which a real arm gets from the
 * world itself.
 */
type Inbound =
  | { type: 'build'; cells: Cell[]; lines: Line[] }
  | { type: 'load'; hex: Hex }
  | { type: 'block'; boxes: Box[]; moved: boolean }
  | { type: 'place'; target: Omit<Target, 'claimed' | 'version'> }
  | { type: 'plan'; id: string; queue?: string[]; to?: Hex }
  | { type: 'remove'; id: string }
  | { type: 'configure'; arm: string; capacity: Capacity }
  | { type: 'ride'; line: string; riders: Riding[] }
  | { type: 'scene'; arm: string; boxes: Box[] };

/**
 * What the hub sends back: each station's layout and the lines on the floor
 * once built, the board as it changes, what rides each line, and every
 * station's events.
 */
type Outbound =
  | {
      type: 'layouts';
      stations: { arm: string; hex: Hex; layout: Layout }[];
      lines: Geometry[];
    }
  | { type: 'board'; targets: Target[] }
  | { type: 'riders'; line: string; riders: Riding[]; running: boolean }
  | { type: 'event'; hex: Hex; arm: string; event: Event };

const scope = self as unknown as {
  onmessage: ((event: MessageEvent<Inbound>) => void) | null;
  postMessage: (message: Outbound[]) => void;
};

let hub: Hub | null = null;
let last = 0;
let shown = '';
let loop: ReturnType<typeof setInterval> | null = null;
/** What each line last carried, as the page was told it. */
const rode = new Map<string, string>();
const feeds = new Map<string, (boxes: Box[]) => void>();

/** The board, as far as the page needs to tell it apart from last time. */
const stamp = (targets: Target[]) =>
  targets
    .map(
      ({ id, version, claimed, queue }) =>
        `${id}:${version}:${claimed}:${queue.length}`
    )
    .join('|');

// The hub's own clock: each wake runs the stations for the time gone by.
const wake = () => {
  if (!hub) {
    return;
  }

  const now = performance.now();

  hub.tick((now - last) / 1000);
  last = now;

  const out: Outbound[] = hub
    .drain()
    .map(({ arm, event, hex }) => ({ type: 'event', arm, event, hex }));
  const targets = hub.board.targets();
  const next = stamp(targets);

  if (next !== shown) {
    shown = next;
    out.push({ type: 'board', targets });
  }

  hub.riders.forEach((riders, line) => {
    const running = hub?.running.get(line) ?? false;
    const moving =
      riders.map(({ at, id }) => `${id}@${at.toFixed(3)}`).join() +
      (running ? '>' : '|');

    if (moving !== rode.get(line)) {
      rode.set(line, moving);
      out.push({ type: 'riders', line, riders, running });
    }
  });

  if (out.length) {
    scope.postMessage(out);
  }
};

scope.onmessage = ({ data }) => {
  switch (data.type) {
    case 'build':
      hub?.close();
      // Each arm's controller runs in a worker of its own, as its own box would.
      hub = create({
        cells: data.cells,
        lines: data.lines,
        connect: (arm) => {
          const link = connect(arm);

          feeds.set(arm, link.feed);

          return link;
        },
        feed: (arm, boxes) => feeds.get(arm)?.(boxes),
      });
      last = performance.now();
      shown = '';
      rode.clear();
      loop ??= setInterval(wake, WAKE);
      scope.postMessage([
        {
          type: 'layouts',
          stations: [...hub.stations.values()].map(({ hex, id, layout }) => ({
            arm: id,
            hex,
            layout,
          })),
          lines: hub.floor,
        },
      ]);
      return;
    case 'load':
      hub?.load(data.hex);

      return;
    case 'block':
      hub?.block(data.boxes, data.moved);

      return;
    case 'place':
      hub?.place(data.target);

      return;
    case 'plan':
      hub?.plan(data.id, data);

      return;
    case 'remove':
      hub?.remove(data.id);

      return;
    case 'configure':
      hub?.configure(data.arm, data.capacity);

      return;
    case 'ride':
      hub?.ride(data.line, data.riders);

      return;
    case 'scene':
      feeds.get(data.arm)?.(data.boxes);
  }
};

export type { Inbound, Outbound };
