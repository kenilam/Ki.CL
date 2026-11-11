import { useEffect, useRef } from 'react';

// Place
import { place } from './place';

// Store
import { store } from '@/views/experiments/tree-of-life/explorer/label-store';
import { pills } from './mounted';

const useSeat = () => {
  const hostRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let raf = 0;

    const tick = () => {
      const host = hostRef.current;

      if (host && store.width) {
        place(host, pills);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return hostRef;
};

export { useSeat };
