// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';
import { useDraftContext } from '@/views/experiments/factory-arm/draft-context';

/**
 * Whether the cell differs from the preset it started from: an obstacle
 * moved, added or taken away, or the cases set differently in Manual.
 */
const useChanged = () => {
  const { applied, edited } = useAppliedContext();
  const { draft } = useDraftContext();

  return (
    edited ||
    draft.stacks !== applied.stacks ||
    draft.pile.layers !== applied.pile.layers ||
    draft.pile.seed !== applied.pile.seed
  );
};

export { useChanged };
