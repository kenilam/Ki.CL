// Partials
import type { Request } from './conductor';
import { plan } from './planner';

/** The worker's side of a message: `postMessage` here takes no target origin. */
const scope = self as unknown as {
  onmessage:
    ((event: MessageEvent<{ id: number; request: Request }>) => void) | null;
  postMessage: (message: unknown) => void;
};

// Plans off the page's thread, so a slow one never holds up a frame.
scope.onmessage = ({ data: { id, request } }) => {
  const { pad, target, world, ...options } = request;

  scope.postMessage({ id, plan: plan(world, target, pad, options) });
};
