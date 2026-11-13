import { useEffect, useState } from 'react';

import { useResponsive } from 'design/hooks';

import type { Coordinates } from '@/views/experiments/daylight/sun';

const STEP_DEGREES = 40;

const STEP_MS = 2400;

const useTurn = (start: Coordinates) => {
  const { prefersReducedMotion } = useResponsive();
  const [centre, setCentre] = useState(start);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const interval = window.setInterval(() => {
      setCentre(({ latitude, longitude }) => {
        return { latitude, longitude: longitude + STEP_DEGREES };
      });
    }, STEP_MS);

    return () => {
      window.clearInterval(interval);
    };
  }, [prefersReducedMotion]);

  return centre;
};

export { useTurn };
