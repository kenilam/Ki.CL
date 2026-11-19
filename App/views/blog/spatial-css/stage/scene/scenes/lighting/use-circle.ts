import { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

const RADIUS = 2.8;

const useCircle = () => {
  const light = useRef<THREE.Group>(null);

  Fiber.useFrame(({ clock }) => {
    const node = light.current;

    if (!node) {
      return;
    }

    const time = clock.elapsedTime * 0.7;

    node.position.set(
      Math.cos(time) * RADIUS,
      0.8 + Math.sin(time * 1.3) * 0.5,
      Math.sin(time) * RADIUS
    );
  });

  return light;
};

export { useCircle };
