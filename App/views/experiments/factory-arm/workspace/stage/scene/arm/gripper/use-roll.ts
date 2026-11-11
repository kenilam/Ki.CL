import { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useArmContext } from '@/views/experiments/factory-arm/workspace/arm-context';

const useRoll = () => {
  const { joints } = useArmContext();

  const roll = useRef<THREE.Group>(null);

  /*
   * The tool axis is the wrist's +z, pointing down. Turning about it by `a`
   * turns the pad's heading by `-a`, so the roll is applied negated.
   */
  Fiber.useFrame(() => {
    roll.current?.rotation.set(0, 0, -joints.current.roll);
  });

  return roll;
};

export { useRoll };
