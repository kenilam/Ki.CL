import { useCallback } from 'react';

// Local storage
import { useLocalStorageContext } from '@/local-storage';

// Partials
import type { Simulation } from './simulations';

const KEY = 'kicl--views--experiments--factory-arm--simulations';

/**
 * The operator's saved simulations. They're kept in this browser for now;
 * this is the one place that would change to keep them on the Backend.
 */
const useSaved = () => {
  const storage = useLocalStorageContext();
  const saved = (storage.getItem<Simulation[] | null>(KEY) ?? []).map(
    (simulation) => ({ ...simulation, saved: true })
  );

  const save = useCallback(
    (simulation: Simulation) =>
      storage.setItem(KEY, [...saved, simulation] as never),
    [saved, storage]
  );

  const discard = useCallback(
    (id: string) =>
      storage.setItem(
        KEY,
        saved.filter((simulation) => simulation.id !== id) as never
      ),
    [saved, storage]
  );

  return { discard, save, saved };
};

export { useSaved };
