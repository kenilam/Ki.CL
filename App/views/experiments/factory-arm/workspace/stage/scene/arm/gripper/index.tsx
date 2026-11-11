import React from 'react';

// Three
import { Drei } from '@/three';

// Partials
import { Mounts } from '@/views/experiments/factory-arm/workspace/stage/scene/arm/mounts';
import { Light } from './light';
import { Plate } from './plate';
import { useRoll } from './use-roll';

// Materials
import { MATERIAL } from '@/views/experiments/factory-arm/workspace/stage/scene/materials';

// Constants
import { GRIPPER, LINK } from '@/views/experiments/factory-arm/engine/arm';
import { HEIGHT, MIDDLE, QUARTER } from './constants';

/** Vacuum box gripper, in the wrist's frame; its pad face is the arm's tip. */
const Gripper: React.FunctionComponent = () => {
  const roll = useRoll();

  return (
    <group>
      <mesh
        castShadow
        receiveShadow
        material={MATERIAL.body}
        rotation-z={QUARTER}
      >
        <cylinderGeometry args={[0.085, 0.085, 0.2, 32]} />
      </mesh>

      <Mounts link='wrist' />

      <group ref={roll}>
        <Mounts link='gripper' />

        <mesh
          castShadow
          receiveShadow
          material={MATERIAL.housing}
          position-z={0.08 + GRIPPER.flange / 2}
          rotation-x={QUARTER}
        >
          <cylinderGeometry args={[0.07, 0.075, GRIPPER.flange, 32]} />
        </mesh>

        <Drei.RoundedBox
          castShadow
          receiveShadow
          args={[GRIPPER.width, GRIPPER.depth, HEIGHT]}
          material={MATERIAL.housing}
          position-z={MIDDLE}
          radius={0.025}
        />
        <Plate />
        <Light />

        <mesh
          castShadow
          receiveShadow
          material={MATERIAL.hose}
          position-z={LINK.hand - GRIPPER.pad / 2}
        >
          <boxGeometry
            args={[GRIPPER.width + 0.02, GRIPPER.depth + 0.02, GRIPPER.pad]}
          />
        </mesh>
      </group>
    </group>
  );
};

export { Gripper };
