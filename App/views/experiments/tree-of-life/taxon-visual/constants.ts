export const DISCLAIMER =
  'Generated from a description - not a photograph, and not always right.';

/** Exhaustion is the one failure a reload cannot clear, so it says so. */
export const ERROR_MESSAGES = {
  unreachable: 'Could not reach the plate. Check your connection and reload.',
  exhausted: 'Out of drawing quota - reloading will not bring it back.',
  unfinished:
    'The drawing did not finish. Reload to send it back for another try.',
};

export function messageKey({
  error,
  status,
}: {
  error: boolean;
  status?: string | null;
}): keyof typeof ERROR_MESSAGES {
  if (error) {
    return 'unreachable';
  }

  if (status === 'EXHAUSTED') {
    return 'exhausted';
  }

  return 'unfinished';
}

export const CLASS_NAME =
  'kicl--views--experiments--tree-of-life--taxon-visual';
