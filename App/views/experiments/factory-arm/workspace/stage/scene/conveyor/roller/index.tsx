import React from 'react';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/workspace/stage/scene/materials';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/engine/layout';
import {
  BELT,
  LENGTH,
  QUARTER,
} from '@/views/experiments/factory-arm/workspace/stage/scene/conveyor/constants';

type Props = {
  /** Which end of the belt: -1 or 1. */
  end: number;
};

const Roller: React.FunctionComponent<Props> = ({ end }) => {
  return (
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.metal}
      position={[0, CONVEYOR.height - BELT / 2, (end * LENGTH) / 2]}
      rotation-z={QUARTER}
    >
      <cylinderGeometry args={[BELT * 0.75, BELT * 0.75, CONVEYOR.width, 20]} />
    </mesh>
  );
};

export { Roller };
