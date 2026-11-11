import { useCallback, useMemo, useRef } from 'react';

// Spec
import type { Cell } from '@/views/experiments/factory-arm/spec';

/** The running cell, which each run attaches here, so the panel outlives the runs. */
const useCell = () => {
  const cell = useRef<Cell | null>(null);

  const attach = useCallback((next: Cell | null) => {
    cell.current = next;
  }, []);

  return useMemo(() => ({ attach, cell }), [attach]);
};

export { useCell };
