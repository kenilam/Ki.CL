import { useEffect, useState } from 'react';

// Constants
import { OFFSET_OF_VIEWPORT } from './constants';

/*
 * How far right of centre the focused taxon sits - a twentieth of the
 * viewport's shorter side.
 *
 * Proportional rather than a spacing token: this is a composition offset in a
 * 3D view, not padding between elements. A fixed 32px was a third of the
 * frame on a phone and a rounding error on a wide monitor. Taking the shorter
 * side means the nudge stays inside the frame whichever way the window is
 * turned.
 */
const useOffset = (): number => {
  const [offsetPx, setOffsetPx] = useState(0);

  useEffect(() => {
    const measure = () =>
      setOffsetPx(
        Math.min(window.innerWidth, window.innerHeight) * OFFSET_OF_VIEWPORT
      );

    measure();

    window.addEventListener('resize', measure);

    return () => window.removeEventListener('resize', measure);
  }, []);

  return offsetPx;
};

export { useOffset };
