import { useMemo } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

// Constants
import { WAYS } from '@/views/experiments/factory-arm/workspace/stage/scene/obstacles/obstacle/arrows/ways';

// Helpers
import { tokenColor } from '@/helper';

const IDLE = { color: new THREE.Color(tokenColor('white-900')), opacity: 0.6 };
const ACTIVE = {
  color: new THREE.Color(tokenColor('green-400')),
  opacity: 0.95,
};

/** How long an arrow stays green after a move its way, in milliseconds. */
const LIT = 250;

const useLook = (id: string, axis: (typeof WAYS)[number]['axis']) => {
  const { moving } = useObstaclesContext();
  const { way } = WAYS.find((each) => {
    return each.axis === axis;
  })!;

  const material = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        ...IDLE,
        color: IDLE.color.clone(),
        depthWrite: false,
        side: THREE.DoubleSide,
        transparent: true,
      }),
    []
  );

  Fiber.useFrame(() => {
    const last = moving.current;
    const recent = last?.id === id && performance.now() - last.at < LIT;
    const active =
      recent &&
      Math.sign(last.by.x) === way.x &&
      Math.sign(last.by.y) === way.y &&
      Math.sign(last.by.z) === way.z;
    const look = active ? ACTIVE : IDLE;

    material.setValues(look);
  });

  return material;
};

export { useLook };
