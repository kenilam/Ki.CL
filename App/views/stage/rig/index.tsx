import React, { PropsWithChildren, useRef } from 'react';

import { useResponsive } from 'design/hooks';

import { Fiber, type THREE } from '@/three';

import { usePose } from './use-pose';

const Rig: React.FunctionComponent<PropsWithChildren> = ({ children }) => {
  const { prefersReducedMotion: still } = useResponsive();
  const group = useRef<THREE.Group>(null);
  const settled = useRef(false);
  const toPose = usePose();

  Fiber.useFrame(({ size, viewport }, delta) => {
    if (!group.current) {
      return;
    }

    const pose = toPose(viewport, size);
    const amount = still || !settled.current ? 1 : 1 - Math.exp(-delta * 3);
    const { position, scale } = group.current;

    settled.current = true;
    position.x += (pose.x - position.x) * amount;
    position.y += (pose.y - position.y) * amount;
    scale.setScalar(scale.x + (pose.scale - scale.x) * amount);
  });

  return <group ref={group}>{children}</group>;
};

export { Rig };
