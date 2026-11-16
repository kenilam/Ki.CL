import { useResponsive } from 'design/hooks';

import { useReady } from '@/views/about/ready/context';

const useShown = () => {
  const { prefersReducedMotion } = useResponsive();
  const { ready } = useReady();

  return ready || prefersReducedMotion;
};

export { useShown };
