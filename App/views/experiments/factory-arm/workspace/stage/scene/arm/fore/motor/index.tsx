import React from 'react';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/workspace/stage/scene/materials';

// Constants
import { QUARTER } from '@/views/experiments/factory-arm/workspace/stage/scene/arm/fore/constants';

type Props = {
  /** Where the motor sits across the elbow. */
  x: number;
};

const Motor: React.FunctionComponent<Props> = ({ x }) => {
  return (
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.housing}
      position={[x, 0.03, -0.34]}
      rotation-x={QUARTER}
    >
      <cylinderGeometry args={[0.04, 0.04, 0.08, 20]} />
    </mesh>
  );
};

export { Motor };
