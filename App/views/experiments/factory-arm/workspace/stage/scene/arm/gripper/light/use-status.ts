import { useMemo } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';
import { useNoticesContext } from '@/views/experiments/factory-arm/workspace/notices-context';

// Helpers
import { tokenColor } from '@/helper';

const IDLE = new THREE.Color(tokenColor('black-400'));
const HOLDING = new THREE.Color(tokenColor('green-300'));
const STOPPED = new THREE.Color(tokenColor('red-600'));

const useStatus = () => {
  const { joints } = useArmContext();
  const { stopped } = useNoticesContext();

  const material = useMemo(
    () => new THREE.MeshStandardMaterial({ color: IDLE, emissive: IDLE }),
    []
  );

  Fiber.useFrame(() => {
    if (stopped) {
      material.emissive.copy(STOPPED);

      return;
    }

    material.emissive.lerpColors(IDLE, HOLDING, joints.current.grip);
  });

  return material;
};

export { useStatus };
