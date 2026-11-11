import { useCallback, useState } from 'react';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

// Partials
import { PRESETS } from '@/views/experiments/factory-arm/presets';
import { last } from './last';

// Spec
import type { Setup } from '@/views/experiments/factory-arm/spec';

const [FIRST] = PRESETS;

/**
 * What the running cell was built from, which preset that was, and whether
 * the cell has changed since. The page opens on the last run, as it was left,
 * or on the first preset.
 */
const useApplied = () => {
  const [previous] = useState(last.read);
  const [applied, setApplied] = useState<Setup>(previous?.setup ?? FIRST);
  // The preset the running cell was built from, or saved as; none when set up by hand.
  const [active, setActive] = useState<string | null>(
    previous ? previous.active : FIRST.id
  );
  const [edited, setEdited] = useState(previous?.edited ?? false);

  const apply = useCallback((setup: Setup, id: string | null) => {
    setActive(id);
    setEdited(false);
    setApplied(setup);
    last.write({ setup, active: id, edited: false });
  }, []);

  // The obstacles as the operator left them, kept so the page opens on them again.
  const edit = useCallback(
    (obstacles: Solid[]) => {
      setEdited(true);
      last.write({ setup: { ...applied, obstacles }, active, edited: true });
    },
    [active, applied]
  );

  // A removed preset can't stay the active one.
  const forget = useCallback((id: string) => {
    setActive((current) => (current === id ? null : current));
  }, []);

  return { active, applied, apply, edit, edited, forget };
};

export { useApplied };
