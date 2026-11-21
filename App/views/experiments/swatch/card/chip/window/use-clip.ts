import { useLayoutEffect, useRef } from 'react';

// Helpers
import { clipOf } from './clip';

// Constants
import { PANE } from '@/views/experiments/swatch/card/chip/constants';

const useClip = () => {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const paper = ref.current;
    const pane = paper?.querySelector<HTMLElement>(`.${PANE}`);

    if (!paper || !pane) {
      return;
    }

    const observer = new ResizeObserver(() => {
      paper.style.clipPath = clipOf(paper, pane);
    });

    observer.observe(paper);
    observer.observe(pane);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
};

export { useClip };
