// Spec
import type { Entry } from '@/views/experiments/factory-arm/spec';

const KEY = 'kicl--views--experiments--factory-arm--log';

/**
 * The log of every run, kept in this browser so it's there after a reload.
 * It goes straight to `localStorage`, not through the context, which would
 * render the page again on every step.
 */
const log = {
  read: (): Entry[] => {
    try {
      const kept = JSON.parse(localStorage.getItem(KEY) ?? '[]');

      // Steps kept before the log read its lines from the copy hold a sentence, not a line to look up.
      return Array.isArray(kept) ? kept.filter((entry) => entry?.note) : [];
    } catch {
      return [];
    }
  },
  write: (entries: Entry[]) => {
    try {
      localStorage.setItem(KEY, JSON.stringify(entries));
    } catch {
      // Full or blocked: the log still shows for this visit.
    }
  },
};

export { log };
