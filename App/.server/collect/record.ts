import { createHash, randomBytes } from 'node:crypto';

/** Where the browser sends its batches. */
export const COLLECT_PATH = '/collect';

/** Anything larger is not a batch this site's client would send. */
export const BODY_LIMIT_BYTES = 16 * 1024;

const TYPES = ['pageview', 'click', 'scroll', 'duration'] as const;

const MAX_EVENTS = 50;
const MAX_TEXT = 512;

type Event = {
  type: (typeof TYPES)[number];
  path: string;
  referrer?: string;
  target?: string;
  href?: string;
  value?: number;
};

type Visitor = {
  address?: string;
  userAgent?: string;
};

/*
 * Without a configured salt each instance makes its own, so the same visitor
 * gets a different session on each Cloud Run instance. Set KICL_ANALYTICS_SALT
 * to keep them consistent.
 */
const SALT = process.env.KICL_ANALYTICS_SALT || randomBytes(16).toString('hex');

/**
 * A visitor id that needs no cookie. The date is part of the hash, so the same
 * person is a new visitor each day and nothing links one day to the next.
 */
function session({ address = '', userAgent = '' }: Visitor): string {
  const day = new Date().toISOString().slice(0, 10);

  return createHash('sha256')
    .update(`${SALT}|${day}|${address}|${userAgent}`)
    .digest('hex')
    .slice(0, 16);
}

function text(value: unknown): string | undefined {
  return typeof value === 'string' ? value.slice(0, MAX_TEXT) : undefined;
}

function parse(value: unknown): Event | null {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const {
    type,
    path,
    referrer,
    target,
    href,
    value: amount,
  } = value as Record<string, unknown>;

  if (!TYPES.includes(type as Event['type']) || typeof path !== 'string') {
    return null;
  }

  return {
    type: type as Event['type'],
    path: path.slice(0, MAX_TEXT),
    referrer: text(referrer),
    target: text(target),
    href: text(href),
    value:
      typeof amount === 'number' && Number.isFinite(amount)
        ? Math.round(amount)
        : undefined,
  };
}

/**
 * Writes each valid event as one JSON line on stdout. Cloud Run hands those to
 * Cloud Logging as `jsonPayload`, and a log sink moves them to BigQuery.
 * Returns how many were kept.
 */
export function record(body: unknown, visitor: Visitor): number {
  const events = (body as { events?: unknown })?.events;

  if (!Array.isArray(events)) {
    return 0;
  }

  const id = session(visitor);
  const kept = events.slice(0, MAX_EVENTS).map(parse).filter(Boolean);

  kept.forEach((event) => {
    console.log(
      JSON.stringify({
        severity: 'INFO',
        message: `analytics ${event?.type}`,
        analytics: { ...event, session: id },
      })
    );
  });

  return kept.length;
}
