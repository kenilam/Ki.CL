import { useMemo } from 'react';

// Partials
import { useConductor } from './use-conductor';
import { useHint } from './use-hint';

/** The engine for one run: the conductor, and the case that blinks as the cell loads. */
const useEngine = () => {
  const conductor = useConductor();
  const hint = useHint();

  return useMemo(() => ({ conductor, hint }), [conductor, hint]);
};

export { useEngine };
