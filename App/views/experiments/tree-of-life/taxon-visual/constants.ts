/**
 * Which `error` phrase a failure reads. Exhaustion is the one failure a reload
 * cannot clear, so it has its own.
 */
export function messageKey({
  error,
  status,
}: {
  error: boolean;
  status?: string | null;
}): 'unreachable' | 'exhausted' | 'unfinished' {
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
