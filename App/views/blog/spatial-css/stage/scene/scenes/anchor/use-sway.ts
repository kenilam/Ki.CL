import { useRef } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

// Three
import { Fiber, THREE } from '@/three';

const useSway = () => {
  const group = useRef<THREE.Group>(null);
  const { prefersReducedMotion: still } = useResponsive();

  Fiber.useFrame(({ clock }) => {
    const node = group.current;

    if (!node) {
      return;
    }

    node.rotation.z = still ? 0.12 : Math.sin(clock.elapsedTime * 0.7) * 0.22;
  });

  return group;
};

export { useSway };
