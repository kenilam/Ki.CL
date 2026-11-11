import { useMemo, useState } from 'react';

// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';

/** The obstacle the operator picked to move or take away. */
const useSelection = () => {
  const { applied } = useAppliedContext();
  // One obstacle starts selected, so its arrows show that obstacles can be picked and moved.
  const [selected, select] = useState<string | null>(
    () => applied.obstacles[0]?.id ?? null
  );

  return useMemo(() => ({ select, selected }), [selected]);
};

export { useSelection };
