import { useInView, useResponsive } from 'design/hooks';

import { useReady } from '@/views/about/ready/context';

const WHOLE = 0.99;

const useWithin = <Element extends HTMLElement>() => {
  const { prefersReducedMotion } = useResponsive();
  const { ready } = useReady();
  const { inView, ref } = useInView<Element>({ once: true, threshold: WHOLE });

  return { ref, within: (inView && ready) || prefersReducedMotion };
};

export { useWithin };
