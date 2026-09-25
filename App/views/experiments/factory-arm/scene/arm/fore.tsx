import React from 'react';

// Three
import { Drei } from '@/three';

// Partials
import { Mounts } from '@/views/experiments/factory-arm/scene/sensors';
import { Hose } from './hose';

// Materials
import { MATERIAL } from './materials';

// Constants
import { LINK } from './constants';

const QUARTER = Math.PI / 2;

const HOSE: [number, number, number][] = [
  [0, 0.2, -0.32],
  [0, 0.32, LINK.fore * 0.2],
  [0, 0.24, LINK.fore * 0.65],
  [0.04, 0.14, LINK.fore - 0.04],
];

/** The wrist motors sit behind the elbow, so the forearm itself stays slim. */
const MOTORS = [-0.09, 0, 0.09];

/** Elbow, its motor housing, and the tapered forearm, in the elbow's frame. */
const Fore: React.FunctionComponent = () => (
  <group>
    <mesh material={MATERIAL.body} position-x={0.1} rotation-z={QUARTER}>
      <cylinderGeometry args={[0.17, 0.17, 0.42, 40]} />
    </mesh>

    <Drei.RoundedBox
      args={[0.34, 0.3, 0.38]}
      material={MATERIAL.body}
      position={[0, 0.04, -0.18]}
      radius={0.06}
    />
    {MOTORS.map((x) => (
      <mesh
        key={x}
        material={MATERIAL.housing}
        position={[x, 0.04, -0.41]}
        rotation-x={QUARTER}
      >
        <cylinderGeometry args={[0.05, 0.05, 0.1, 20]} />
      </mesh>
    ))}

    {/* A cylinder's top is its +y end, which this turns to face the wrist. */}
    <mesh
      material={MATERIAL.body}
      position-z={LINK.fore / 2}
      rotation-x={QUARTER}
    >
      <cylinderGeometry args={[0.09, 0.14, LINK.fore - 0.2, 32]} />
    </mesh>

    <Hose points={HOSE} />

    <Mounts link='fore' />
  </group>
);

export { Fore };
