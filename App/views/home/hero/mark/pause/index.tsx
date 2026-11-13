import React, { useEffect, useState } from 'react';

import { useResponsive } from 'design/hooks';

import { Fiber } from '@/three';

const Pause: React.FunctionComponent = () => {
  const { prefersReducedMotion: still } = useResponsive();
  const { frameloop, gl, setFrameloop } = Fiber.useThree();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    });

    observer.observe(gl.domElement);

    return () => {
      observer.disconnect();
    };
  }, [gl]);

  useEffect(() => {
    const running = visible ? 'always' : 'never';
    const next = still ? 'demand' : running;

    if (frameloop !== next) {
      setFrameloop(next);
    }
  }, [frameloop, setFrameloop, still, visible]);

  return null;
};

export { Pause };
