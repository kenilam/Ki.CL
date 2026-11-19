import { useRef } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

// Three
import { Fiber, THREE } from '@/three';

const BEHIND = -1.6;
const AHEAD = 2.4;
const FIT = 0.75;
const GROWTH = 0.45;

const useNear = () => {
  const group = useRef<THREE.Group>(null);
  const { prefersReducedMotion: still } = useResponsive();

  Fiber.useFrame(({ clock }) => {
    const node = group.current;

    if (!node) {
      return;
    }

    const travel = still ? 1 : (Math.sin(clock.elapsedTime * 0.5) + 1) / 2;
    const z = BEHIND + travel * (AHEAD - BEHIND);
    const grow = THREE.MathUtils.smoothstep(z, 0.4, AHEAD);

    node.position.z = z;
    node.scale.setScalar(FIT + grow * GROWTH);
  });

  return group;
};

export { useNear };
