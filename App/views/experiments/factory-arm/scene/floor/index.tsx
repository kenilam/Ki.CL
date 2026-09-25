import React from 'react';

// Physics
import { CuboidCollider, RigidBody } from '@react-three/rapier';

const SIZE = 10;

/** The cell floor: what a dropped case lands on. */
const Floor: React.FunctionComponent = () => (
  <RigidBody type='fixed' colliders={false}>
    <CuboidCollider
      args={[SIZE / 2, 0.05, SIZE / 2]}
      position={[0, -0.05, 0]}
    />
    <mesh rotation-x={-Math.PI / 2}>
      <planeGeometry args={[SIZE, SIZE]} />
      <meshStandardMaterial color='#e9e6df' />
    </mesh>
  </RigidBody>
);

export { Floor };
