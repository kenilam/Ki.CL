import { useMemo } from 'react';

const useStill = () => {
  return useMemo(() => {
    return matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);
};

export { useStill };
