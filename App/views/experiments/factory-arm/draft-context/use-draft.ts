import { useMemo, useState } from 'react';

// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';

// Spec
import type { Draft } from '@/views/experiments/factory-arm/spec';

/** The Manual tab's draft for the next run, which starts from the applied setup. */
const useDraft = () => {
  const { applied } = useAppliedContext();
  const [draft, setDraft] = useState<Draft>({
    pile: applied.pile,
    stacks: applied.stacks,
  });

  return useMemo(() => ({ draft, setDraft }), [draft]);
};

export { useDraft };
