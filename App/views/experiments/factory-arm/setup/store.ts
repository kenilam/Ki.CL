import { useCallback } from 'react';

// Local storage
import { useLocalStorageContext } from '@/local-storage';

// Spec
import type { Preset } from './spec';

const KEY = 'kicl--views--experiments--factory-arm--presets';

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

export { useSaved };
