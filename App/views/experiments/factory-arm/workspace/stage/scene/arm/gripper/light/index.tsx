import React from 'react';

// Partials
import { useStatus } from './use-status';

// Constants
import { GRIPPER } from '@/views/experiments/factory-arm/engine/arm';
import {
  FACE,
  TOP,
} from '@/views/experiments/factory-arm/workspace/stage/scene/arm/gripper/constants';

/** The status light: red when the arm has stopped with no way on or back, green while holding. */
const Light: React.FunctionComponent = () => {
  const material = useStatus();

  return (
    <mesh
      castShadow
      receiveShadow
      material={material}
      position={[GRIPPER.width / 2 - 0.04, FACE + 0.02, TOP + 0.03]}
    >
      <sphereGeometry args={[0.022, 16, 16]} />
    </mesh>
  );
};

export { Light };
