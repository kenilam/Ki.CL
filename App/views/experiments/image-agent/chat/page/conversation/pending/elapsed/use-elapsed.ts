// Hooks
import { useNow } from 'design/hooks';

/** Whole seconds since `since`, counting up once a second while mounted. */
function useElapsed(since: string | number | Date | undefined): number {
  const now = useNow();

  if (since === undefined) {
    return 0;
  }

  return Math.max(0, Math.floor((now - new Date(since).getTime()) / 1000));
}

export { useElapsed };
