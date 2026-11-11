import React from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/workspace/stage/scene/materials';

// Belt
import { useBelt } from './use-belt';

// Partials
import { Roller } from './roller';
import { Side } from './side';

// Constants
import { CONVEYOR } from '@/views/experiments/factory-arm/engine/layout';
import { BELT, ENDS, LENGTH, MIDDLE, SIDES, SOLID } from './constants';

/** The outfeed: a belt that carries whatever lands on it off toward the viewer. */
const Conveyor: React.FunctionComponent = () => {
  useBelt();

  return (
    <RigidBody
      type='fixed'
      colliders={false}
      position={[CONVEYOR.x, 0, MIDDLE]}
    >
      <CuboidCollider
        args={[CONVEYOR.width / 2, SOLID / 2, LENGTH / 2]}
        friction={0}
        position={[0, CONVEYOR.height - SOLID / 2, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        material={MATERIAL.housing}
        position-y={CONVEYOR.height - BELT / 2}
      >
        <boxGeometry args={[CONVEYOR.width, BELT, LENGTH]} />
      </mesh>

      {SIDES.map((x) => {
        return <Side key={x} x={x} />;
      })}

      {ENDS.map((end) => {
        return <Roller end={end} key={end} />;
      })}
    </RigidBody>
  );
};

export { Conveyor };
