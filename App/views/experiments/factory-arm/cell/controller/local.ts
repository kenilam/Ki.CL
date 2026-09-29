// Protocol
import type { Box, Link, Report } from '../protocol';

// Partials
import { create } from './controller';

// Constants
import { REPORT, TICK } from './constants';

/**
 * An arm's controller on this thread, as the hub sees it: the same `Link`
 * a worker or a socket gives, for tests and for hosts without workers.
 * `tick` runs the servo loop for `dt` seconds and delivers its reports.
 */
const local = (
  arm: string
): Link & { feed: (boxes: Box[]) => void; tick: (dt: number) => void } => {
  const controller = create({ arm });
  const handlers = new Set<(report: Report) => void>();
  let owed = 0;
  let since = 0;

  const deliver = (reports: Report[]) =>
    reports.forEach((report) => handlers.forEach((handler) => handler(report)));

  return {
    arm,
    send: (command) => controller.command(command),
    feed: (boxes) => controller.feed(boxes),
    listen: (handler) => {
      handlers.add(handler);

      return () => handlers.delete(handler);
    },
    close: () => handlers.clear(),
    tick: (dt) => {
      owed += dt;

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

      deliver(reports);
    },
  };
};

export { local };
