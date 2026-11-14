import { useEffect } from 'react';

import { useInView } from 'design/hooks';

import { useActive } from './active/context';

import type { Moment } from './constants';

const useMoment = <Element extends HTMLElement>(moment: Moment) => {
  const { mark } = useActive();
  const { inView, ref } = useInView<Element>({
    rootMargin: '-50% 0px -50% 0px',
  });

  useEffect(() => {
    if (!inView) {
      return;
    }

    mark(moment);
  }, [inView, mark, moment]);

  return ref;
};

export { useMoment };
