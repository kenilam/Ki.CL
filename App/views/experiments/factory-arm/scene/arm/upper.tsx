import React from 'react';

// Three
import { Drei } from '@/three';

// Partials
import { Mounts } from '@/views/experiments/factory-arm/scene/sensors';
import { Hose } from './hose';

// Materials
import { MATERIAL } from './materials';

// Constants
import { LINK, SIDE } from './constants';

const QUARTER = Math.PI / 2;

const HOSE: [number, number, number][] = [
  [SIDE + 0.12, -0.14, -0.05],
  [SIDE + 0.17, -0.2, LINK.upper * 0.35],
  [SIDE + 0.15, -0.18, LINK.upper * 0.75],
  [SIDE + 0.05, -0.12, LINK.upper - 0.04],
];

/** Shoulder gearbox, upper arm and its balancer, in the shoulder's frame. */
const Upper: React.FunctionComponent = () => (
  <group>
    <mesh material={MATERIAL.body} position-x={0.1} rotation-z={QUARTER}>
      <cylinderGeometry args={[0.2, 0.2, 0.46, 40]} />
    </mesh>
    <mesh material={MATERIAL.housing} position-x={0.35} rotation-z={QUARTER}>
      <cylinderGeometry args={[0.12, 0.12, 0.06, 32]} />
    </mesh>

    <Drei.RoundedBox
      args={[0.2, 0.26, LINK.upper]}
      material={MATERIAL.body}
      position={[SIDE, 0, LINK.upper / 2]}
      radius={0.06}
    />

    {/* The spring balancer that lets the shoulder hold the arm up. */}
    <mesh
      material={MATERIAL.metal}
      position={[SIDE + 0.13, 0.12, LINK.upper * 0.3]}
      rotation-x={QUARTER}
    >
      <cylinderGeometry args={[0.05, 0.05, LINK.upper * 0.5, 20]} />
    </mesh>

    <Hose points={HOSE} />

    <Mounts link='upper' />
  </group>
);

export { Upper };
