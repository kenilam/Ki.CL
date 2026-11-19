import { useRef } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

// Three
import { Fiber, THREE } from '@/three';

const useSpin = () => {
  const group = useRef<THREE.Group>(null);
  const { prefersReducedMotion: still } = useResponsive();

  Fiber.useFrame((_, delta) => {
    const node = group.current;

    if (!node || still) {
      return;
    }

    node.rotation.y += delta * 0.6;
  });

  return group;
};

export { useSpin };
