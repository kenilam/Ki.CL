import { useEffect, useState } from 'react';

const DIRECTIONS = {
  down: 'down',
  up: 'up',
} as const;

const THRESHOLD = 8;

type Direction = (typeof DIRECTIONS)[keyof typeof DIRECTIONS];

const useScrollDirection = (threshold = THRESHOLD) => {
  const [direction, setDirection] = useState<Direction>(DIRECTIONS.up);
  const [isAtStart, setIsAtStart] = useState(() => window.scrollY <= 0);

  useEffect(() => {
    let previous = Math.max(0, window.scrollY);
    let frame = 0;

    const scrollListener: globalThis.EventListener = () => {
      if (frame) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;

        const current = Math.max(0, window.scrollY);

        setIsAtStart(current <= 0);

        if (Math.abs(current - previous) < threshold) {
          return;
        }

        setDirection(current > previous ? DIRECTIONS.down : DIRECTIONS.up);

        previous = current;
      });
    };

    window.addEventListener('scroll', scrollListener, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('scroll', scrollListener);
    };
  }, [threshold]);

  return { direction, isAtStart };
};

export { DIRECTIONS };
export default useScrollDirection;
