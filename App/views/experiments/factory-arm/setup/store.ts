import { useCallback } from 'react';

// Local storage
import { useLocalStorageContext } from '@/local-storage';

// Spec
import type { Entry, Preset, Setup } from './spec';

const KEY = 'kicl--views--experiments--factory-arm--presets';
const LOG = 'kicl--views--experiments--factory-arm--log';
const LAST = 'kicl--views--experiments--factory-arm--last';

/**
 * The operator's saved presets. They're kept in this browser for now; this
 * is the one place that would change to keep them on the Backend.
 */
const useSaved = () => {
  const storage = useLocalStorageContext();
  const saved = (storage.getItem<Preset[] | null>(KEY) ?? []).map((preset) => ({
    ...preset,
    saved: true,
  }));

  const save = useCallback(
    (preset: Preset) => storage.setItem(KEY, [...saved, preset] as never),
    [saved, storage]
  );

  const discard = useCallback(
    (id: string) =>
      storage.setItem(KEY, saved.filter((preset) => preset.id !== id) as never),
    [saved, storage]
  );

  return { discard, save, saved };
};

/**
 * The log of every run, kept in this browser so it's there after a reload.
 * It goes straight to `localStorage`, not through the context, which would
 * render the page again on every step.
 */
const log = {
  read: (): Entry[] => {
    try {
      const kept = JSON.parse(localStorage.getItem(LOG) ?? '[]');

      return Array.isArray(kept) ? kept : [];
    } catch {
      return [];
    }
  },
  write: (entries: Entry[]) => {
    try {
      localStorage.setItem(LOG, JSON.stringify(entries));
    } catch {
      // Full or blocked: the log still shows for this visit.
    }
  },
};

/**
 * The last run: the setup it started from, with the obstacles as the
 * operator last left them, which preset it was, and whether it was edited.
 * The page opens on it again.
 */
type Last = { setup: Setup; active: string | null; edited: boolean };

const last = {
  read: (): Last | null => {
    try {
      const kept = JSON.parse(localStorage.getItem(LAST) ?? 'null');

      return kept?.setup ? kept : null;
    } catch {
      return null;
    }
  },
  write: (value: Last) => {
    try {
      localStorage.setItem(LAST, JSON.stringify(value));
    } catch {
      // Full or blocked: the page opens on the first preset instead.
    }
  },
};

export { last, log, useSaved };
