import { useResponsive } from 'design/hooks';

import { useReady } from '@/views/ready/context';

const useShown = () => {
  const { prefersReducedMotion } = useResponsive();
  const { ready } = useReady();

  return ready || prefersReducedMotion;
};

export { useShown };
