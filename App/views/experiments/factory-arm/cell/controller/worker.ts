// Protocol
import type { Box, Command, Report } from '../protocol';

// Partials
import { create, type Controller } from './controller';

// Constants
import { REPORT, TICK } from './constants';

/** How often the loop wakes, in milliseconds; each wake runs the ticks owed since the last. */
const WAKE = 4;

/** The most time one wake makes up for, in seconds, so a tab coming back doesn't run a backlog. */
const CATCHUP = 0.25;

/** What reaches the worker besides commands: its own boot, and the cell's solids for its sensors to meet. */
type Inbound =
  Command | { type: 'boot'; arm: string } | { type: 'scene'; boxes: Box[] };

/** The worker's side of a message: `postMessage` here takes no target origin. */
const scope = self as unknown as {
  onmessage: ((event: MessageEvent<Inbound>) => void) | null;
  postMessage: (message: Report[]) => void;
};

let controller: Controller | null = null;
let last = 0;
let owed = 0;
let since = 0;

// The servo loop: fixed ticks, as many as the wall clock owes, then one batch of reports.
const loop = () => {
  if (!controller) {
    return;
  }

  const now = performance.now();

  owed = Math.min(CATCHUP, owed + (now - last) / 1000);
  last = now;

  while (owed >= TICK) {
    controller.tick(TICK);
    owed -= TICK;
    since += TICK;
  }

  const reports = controller.drain();

  if (since >= REPORT) {
    since = 0;
    reports.push(controller.telemetry());
  }

  if (reports.length) {
    scope.postMessage(reports);
  }
};

scope.onmessage = ({ data }) => {
  switch (data.type) {
    case 'boot':
      controller = create({ arm: data.arm });
      last = performance.now();
      setInterval(loop, WAKE);

      return;
    case 'scene':
      controller?.feed(data.boxes);

      return;
    default:
      controller?.command(data);
  }
};
