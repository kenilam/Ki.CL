// Same path and batch cap as `App/.server/collect/record.ts`.
const COLLECT_PATH = '/collect';
const MAX_EVENTS = 50;

type Event = {
  type: 'pageview' | 'click' | 'scroll' | 'duration';
  path: string;
  referrer?: string;
  target?: string;
  href?: string;
  value?: number;
};

const events: Event[] = [];

/**
 * Sends everything queued in one request. `sendBeacon` survives the page being
 * closed, which is when most batches go. A string body is sent as text/plain,
 * which every browser accepts for a beacon.
 */
function flush() {
  if (!events.length) {
    return;
  }

  const body = JSON.stringify({ events: events.splice(0) });

  if (navigator.sendBeacon?.(COLLECT_PATH, body)) {
    return;
  }

  window
    .fetch?.(COLLECT_PATH, { method: 'POST', body, keepalive: true })
    .catch(() => undefined);
}

function enqueue(event: Event) {
  events.push(event);

  if (events.length >= MAX_EVENTS) {
    flush();
  }
}

export { enqueue, flush, type Event };
