import { useEffect, useState } from 'react';

import { useInView, useResponsive } from 'design/hooks';

import { whenIdle } from './when-idle';

const useSeen = <Element extends HTMLElement>() => {
  const { prefersReducedMotion } = useResponsive();
  const { inView, ref } = useInView<Element>({ once: true });
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    if (!inView) {
      return;
    }

    return whenIdle(() => {
      setSeen(true);
    });
  }, [inView]);

  return { ref, seen: seen || prefersReducedMotion };
};

export { useSeen };
