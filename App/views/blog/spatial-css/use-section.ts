import { useEffect } from 'react';

// Hooks
import { useInView } from 'design/hooks';
import { useScene } from './context';

// Constants
import type { Shot } from './stage/shots';

const useSection = <Element extends HTMLElement>(shot: Shot) => {
  const { mark } = useScene();
  const { inView, ref } = useInView<Element>({
    rootMargin: '-50% 0px -50% 0px',
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    mark(shot);
  }, [inView, mark, shot]);

  return ref;
};

export { useSection };
