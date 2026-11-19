import { useRef } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

// Three
import { Fiber, THREE } from '@/three';

const REACH = 1.15;

const useGlide = () => {
  const group = useRef<THREE.Group>(null);
  const { prefersReducedMotion: still } = useResponsive();

  Fiber.useFrame(({ clock }) => {
    const node = group.current;

    if (!node) {
      return;
    }

    const wave = still ? 0 : Math.sin(clock.elapsedTime * 0.9);
    const eased = Math.sign(wave) * Math.pow(Math.abs(wave), 0.6);

    node.position.x = eased * REACH;
  });

  return group;
};

export { useGlide };
