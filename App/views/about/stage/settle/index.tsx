import React, { useEffect, useRef } from 'react';

import { useResponsive } from 'design/hooks';

import { Fiber } from '@/three';

import { useReady } from '@/views/about/ready/context';

const SETTLED = 1.8;

const Settle: React.FunctionComponent = () => {
  const { prefersReducedMotion: still } = useResponsive();
  const { settle } = useReady();
  const told = useRef(false);

  useEffect(() => {
    if (!still) {
      return;
    }

    settle();
  }, [settle, still]);

  Fiber.useFrame(({ clock }) => {
    if (told.current || clock.elapsedTime < SETTLED) {
      return;
    }

    told.current = true;
    settle();
  });

  return null;
};

export { Settle };
