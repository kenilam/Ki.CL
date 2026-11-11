// Spec
import type { Setup } from '@/views/experiments/factory-arm/spec';

const KEY = 'kicl--views--experiments--factory-arm--last';

/**
 * The last run: the setup it started from, with the obstacles as the
 * operator last left them, which preset it was, and whether it was edited.
 * The page opens on it again.
 */
type Last = { setup: Setup; active: string | null; edited: boolean };

const last = {
  read: (): Last | null => {
    try {
      const kept = JSON.parse(localStorage.getItem(KEY) ?? 'null');

      return kept?.setup ? kept : null;
    } catch {
      return null;
    }
  },
  write: (value: Last) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(value));
    } catch {
      // Full or blocked: the page opens on the first preset instead.
    }
  },
};

export { last };
