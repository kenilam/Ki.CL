import { useRef, useState } from 'react';

// Physics
import type { RapierRigidBody } from '@react-three/rapier';

// Three
import { Fiber } from '@/three';

// Context
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

const centre = ({ min, max }: Solid) => ({
  x: (min.x + max.x) / 2,
  y: (min.y + max.y) / 2,
  z: (min.z + max.z) / 2,
});

const useFollow = (id: string) => {
  const { obstacles } = useObstaclesContext();
  const body = useRef<RapierRigidBody>(null);
  const [{ x, y, z }] = useState(() =>
    centre(obstacles.current.find((solid) => solid.id === id)!)
  );

  Fiber.useFrame(() => {
    const solid = obstacles.current.find((each) => each.id === id);

    if (solid) {
      body.current?.setNextKinematicTranslation(centre(solid));
    }
  });

  return { body, position: [x, y, z] as [number, number, number] };
};

export { useFollow };
