import { useCallback, useMemo, useState } from 'react';

// Context
import { useCellContext } from '@/views/experiments/factory-arm/cell-context';
import { useRunContext } from '@/views/experiments/factory-arm/run-context';

// Spec
import type { Preset, Setup } from '@/views/experiments/factory-arm/spec';

/** The setup waiting on the operator to confirm starting over while the arm works. */
const usePending = () => {
  const { cell } = useCellContext();
  const { proceed } = useRunContext();
  const [pending, setPending] = useState<Preset | Setup | null>(null);

  /** Builds the cell again from `setup`; while the arm is working, asks first. */
  const start = useCallback(
    (setup: Preset | Setup) => {
      if (cell.current?.busy()) {
        setPending(setup);

        return;
      }

      proceed(setup);
    },
    [cell, proceed]
  );

  const cancel = useCallback(() => {
    setPending(null);
  }, []);

  return useMemo(() => ({ cancel, pending, start }), [cancel, pending, start]);
};

export { usePending };
