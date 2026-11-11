// Context
import { usePendingContext } from '@/views/experiments/factory-arm/pending-context';

// Partials
import { useCurrent } from '@/views/experiments/factory-arm/workspace/panel/use-current';

/** Builds the cell again as it stands; while the arm is working, asks first. */
const useProceed = () => {
  const { start } = usePendingContext();
  const current = useCurrent();

  return () => {
    start(current());
  };
};

export { useProceed };
