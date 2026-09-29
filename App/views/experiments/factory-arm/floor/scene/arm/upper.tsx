import React from 'react';

// Three
import { Drei } from '@/three';

// Model
import {
  LINK,
  SIDE,
} from '@/views/experiments/factory-arm/cell/model/constants';

// Partials
import { Hose } from './hose';

// Materials
import { MATERIAL } from './materials';

const QUARTER = Math.PI / 2;

const HOSE: [number, number, number][] = [
  [SIDE + 0.09, -0.11, -0.04],
  [SIDE + 0.13, -0.15, LINK.upper * 0.35],
  [SIDE + 0.11, -0.14, LINK.upper * 0.75],
  [SIDE + 0.04, -0.09, LINK.upper - 0.03],
];

/** Shoulder gearbox, upper arm and its balancer, in the shoulder's frame. */
const Upper: React.FunctionComponent = () => (
  <group>
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.body}
      position-x={0.08}
      rotation-z={QUARTER}
    >
      <cylinderGeometry args={[0.15, 0.15, 0.35, 40]} />
    </mesh>
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.housing}
      position-x={0.27}
      rotation-z={QUARTER}
    >
      <cylinderGeometry args={[0.09, 0.09, 0.05, 32]} />
    </mesh>
    <Drei.RoundedBox
      castShadow
      receiveShadow
      args={[0.15, 0.2, LINK.upper]}
      material={MATERIAL.body}
      position={[SIDE, 0, LINK.upper / 2]}
      radius={0.045}
    />
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.metal}
      position={[SIDE + 0.1, 0.09, LINK.upper * 0.3]}
      rotation-x={QUARTER}
    >
      <cylinderGeometry args={[0.038, 0.038, LINK.upper * 0.5, 20]} />
    </mesh>
    <Hose points={HOSE} />
  </group>
);

export { Upper };
