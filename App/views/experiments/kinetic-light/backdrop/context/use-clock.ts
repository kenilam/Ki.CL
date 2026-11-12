import { useMemo } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

// Constants
import { START } from '@/views/experiments/kinetic-light/backdrop/interstellar';

const useClock = () => {
  const { prefersReducedMotion: still } = useResponsive();

  return useMemo(() => {
    let began: number | null = null;

    return () => {
      if (still) {
        return START;
      }

      began ??= performance.now();

      return START + (performance.now() - began) / 1000;
    };
  }, [still]);
};

export { useClock };
