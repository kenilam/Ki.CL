import type { Command } from './commands';
import type { Report } from './reports';

/**
 * One arm from the hub's side of the wire, whatever carries it: a worker on
 * this page, a socket to a controller box on the shop floor. The hub keeps
 * one per arm and never sees the difference.
 */
type Link = {
  arm: string;
  send: (command: Command) => void;
  listen: (handler: (report: Report) => void) => () => void;
  close: () => void;
};

export type { Link };
