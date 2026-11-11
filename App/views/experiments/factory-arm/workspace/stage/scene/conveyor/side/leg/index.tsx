import React from 'react';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/workspace/stage/scene/materials';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/engine/layout';
import {
  BELT,
  MIDDLE,
} from '@/views/experiments/factory-arm/workspace/stage/scene/conveyor/constants';

type Props = {
  /** Where the leg stands along the belt. */
  z: number;
};

const Leg: React.FunctionComponent<Props> = ({ z }) => {
  return (
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.metal}
      position={[0, (CONVEYOR.height - BELT) / 2, z - MIDDLE]}
    >
      <boxGeometry args={[0.05, CONVEYOR.height - BELT, 0.05]} />
    </mesh>
  );
};

export { Leg };
