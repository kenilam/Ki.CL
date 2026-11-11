import React from 'react';

// Three
import { Drei } from '@/three';

// Partials
import { Hole } from './hole';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/workspace/stage/scene/materials';

// Constants
import { GRIPPER, PLATE } from '@/views/experiments/factory-arm/engine/arm';
import {
  FACE,
  HEIGHT,
  MIDDLE,
} from '@/views/experiments/factory-arm/workspace/stage/scene/arm/gripper/constants';

const HOLES = Array.from({ length: PLATE.rows * PLATE.columns }, (_, index) => [
  ((index % PLATE.columns) / (PLATE.columns - 1) - 0.5) * GRIPPER.width * 0.78,
  FACE + 0.012,
  MIDDLE +
    (Math.floor(index / PLATE.columns) / (PLATE.rows - 1) - 0.5) * HEIGHT * 0.7,
]) as [number, number, number][];

const Plate: React.FunctionComponent = () => (
  <>
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.plate}
      position={[0, FACE + 0.005, MIDDLE]}
    >
      <boxGeometry args={[GRIPPER.width * 0.88, 0.01, HEIGHT * 0.86]} />
    </mesh>
    <Drei.Instances limit={HOLES.length} material={MATERIAL.housing}>
      <circleGeometry args={[0.011, 12]} />
      {HOLES.map((position) => {
        return <Hole key={position.join()} position={position} />;
      })}
    </Drei.Instances>
  </>
);

export { Plate };
