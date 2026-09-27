import React from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

// Three
import { Fiber } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { DRAG } from '@/views/experiments/factory-arm/scene/constants';

const SIZE = 10;

/** The cell floor: what a dropped case lands on. Clicking it lets go of the selected obstacle. */
const Floor: React.FunctionComponent = () => {
  const { select } = useFactoryArmContext();

  const release = (event: Fiber.ThreeEvent<MouseEvent>) => {
    if (event.delta <= DRAG) {
      select(null);
    }
  };

  return (
    <RigidBody type='fixed' colliders={false}>
      <CuboidCollider
        args={[SIZE / 2, 0.05, SIZE / 2]}
        position={[0, -0.05, 0]}
      />
      <mesh onClick={release} receiveShadow rotation-x={-Math.PI / 2}>
        <planeGeometry args={[SIZE, SIZE]} />
        <meshStandardMaterial color='#e9e6df' />
      </mesh>
    </RigidBody>
  );
};

export { Floor };
