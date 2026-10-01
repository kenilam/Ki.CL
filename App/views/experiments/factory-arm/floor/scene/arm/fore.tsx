import React from 'react';

// Three
import { Drei } from '@/three';

// Model
import { LINK } from 'arm/model/constants';

// Partials
import { Hose } from './hose';

// Materials
import { MATERIAL } from './materials';

const QUARTER = Math.PI / 2;

const HOSE: [number, number, number][] = [
  [0, 0.15, -0.26],
  [0, 0.24, LINK.fore * 0.2],
  [0, 0.18, LINK.fore * 0.65],
  [0.03, 0.1, LINK.fore - 0.03],
];

/** The wrist motors sit behind the elbow, so the forearm itself stays slim. */
const MOTORS = [-0.07, 0, 0.07];

/** Elbow, its motor housing, and the tapered forearm, in the elbow's frame. */
const Fore: React.FunctionComponent = () => (
  <group>
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.body}
      position-x={0.08}
      rotation-z={QUARTER}
    >
      <cylinderGeometry args={[0.13, 0.13, 0.32, 40]} />
    </mesh>
    <Drei.RoundedBox
      castShadow
      receiveShadow
      args={[0.26, 0.23, 0.3]}
      material={MATERIAL.body}
      position={[0, 0.03, -0.15]}
      radius={0.045}
    />
    {MOTORS.map((x) => (
      <mesh
        castShadow
        receiveShadow
        key={x}
        material={MATERIAL.housing}
        position={[x, 0.03, -0.34]}
        rotation-x={QUARTER}
      >
        <cylinderGeometry args={[0.04, 0.04, 0.08, 20]} />
      </mesh>
    ))}
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.body}
      position-z={LINK.fore / 2}
      rotation-x={QUARTER}
    >
      <cylinderGeometry args={[0.07, 0.105, LINK.fore - 0.2, 32]} />
    </mesh>
    <Hose points={HOSE} />
  </group>
);

export { Fore };
