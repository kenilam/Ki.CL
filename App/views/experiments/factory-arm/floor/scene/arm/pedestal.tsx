import React from 'react';

// Three
import { Drei } from '@/three';

// Materials
import { MATERIAL } from './materials';

/** Bolted to the floor: it does not turn with the arm. */
const Pedestal: React.FunctionComponent = () => (
  <group>
    <Drei.RoundedBox
      castShadow
      receiveShadow
      args={[0.9, 0.06, 0.9]}
      material={MATERIAL.metal}
      position-y={0.03}
      radius={0.02}
    />
    <mesh castShadow receiveShadow material={MATERIAL.metal} position-y={0.16}>
      <cylinderGeometry args={[0.3, 0.34, 0.2, 40]} />
    </mesh>
  </group>
);

export { Pedestal };
