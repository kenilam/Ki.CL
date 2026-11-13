import { useSyncExternalStore } from 'react';

import { useResponsive } from 'design/hooks';

const subscribe = (onScroll: () => void) => {
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', onScroll);
  };
};

const atTop = () => {
  return window.scrollY <= 0;
};

const useShown = () => {
  const { isNarrow } = useResponsive();
  const top = useSyncExternalStore(subscribe, atTop);

  return isNarrow || top;
};

export { useShown };
