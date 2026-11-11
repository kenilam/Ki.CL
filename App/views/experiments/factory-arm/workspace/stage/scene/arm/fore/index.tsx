import React from 'react';

// Three
import { Drei } from '@/three';

// Partials
import { Mounts } from '@/views/experiments/factory-arm/workspace/stage/scene/arm/mounts';
import { Hose } from '@/views/experiments/factory-arm/workspace/stage/scene/arm/hose';

// Partials
import { Motor } from './motor';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/workspace/stage/scene/materials';

// Constants
import { LINK } from '@/views/experiments/factory-arm/engine/arm';
import { MOTORS, QUARTER } from './constants';

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
    {MOTORS.map((x) => {
      return <Motor key={x} x={x} />;
    })}
    {/* A cylinder's top is its +y end, which this turns to face the wrist. */}
    <mesh
      castShadow
      receiveShadow
      material={MATERIAL.body}
      position-z={LINK.fore / 2}
      rotation-x={QUARTER}
    >
      <cylinderGeometry args={[0.07, 0.105, LINK.fore - 0.2, 32]} />
    </mesh>

    <Hose link='fore' />

    <Mounts link='fore' />
  </group>
);

export { Fore };
