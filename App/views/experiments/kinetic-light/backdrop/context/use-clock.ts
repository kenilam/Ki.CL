import { useMemo } from 'react';

// Hooks
import { useStill } from '@/views/experiments/kinetic-light/backdrop/use-still';

// Constants
import { START } from '@/views/experiments/kinetic-light/backdrop/interstellar';

const useClock = () => {
  const still = useStill();

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
