import React from 'react';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/workspace/stage/scene/materials';

// Partials
import { Leg } from './leg';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/engine/layout';
import {
  LEGS,
  LENGTH,
  RAIL,
} from '@/views/experiments/factory-arm/workspace/stage/scene/conveyor/constants';

type Props = {
  /** Which side of the belt, across its width. */
  x: number;
};

/** A rail along one side of the belt, on its legs. */
const Side: React.FunctionComponent<Props> = ({ x }) => {
  return (
    <group position-x={x}>
      <mesh
        castShadow
        receiveShadow
        material={MATERIAL.metal}
        position={[0, CONVEYOR.height + RAIL.lip - RAIL.height / 2, 0]}
      >
        <boxGeometry args={[RAIL.width, RAIL.height, LENGTH]} />
      </mesh>
      {LEGS.map((z) => {
        return <Leg key={z} z={z} />;
      })}
    </group>
  );
};

export { Side };
