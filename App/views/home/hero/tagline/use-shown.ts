import { useSyncExternalStore } from 'react';

import { useResponsive } from 'design/hooks';

import { getRest } from '@/views/home/hero/rest';

const subscribe = (onScroll: () => void) => {
  window.addEventListener('scroll', onScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', onScroll);
  };
};

const atRest = () => {
  const scrolled = Math.ceil(window.scrollY);

  return scrolled >= getRest() && scrolled < window.innerHeight;
};

const useShown = () => {
  const { isNarrow } = useResponsive();
  const rest = useSyncExternalStore(subscribe, atRest);

  return isNarrow || rest;
};

export { useShown };
