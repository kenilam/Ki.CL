import React from 'react';

// Partials
import { Fore } from './fore';
import { Gripper } from './gripper';
import { Pedestal } from './pedestal';
import { Turret } from './turret';
import { Upper } from './upper';
import { usePose } from './use-pose';

// Constants
import { LINK } from '@/views/experiments/factory-arm/engine/arm';

/*
 * Each link points down its own +z, and each joint pitches about its own x.
 * A positive `rotation.x` turns +z downward, so pitching up is negative.
 */
const Arm: React.FunctionComponent = () => {
  const { elbow, shoulder, wrist, yaw } = usePose();

  return (
    <group>
      <Pedestal />

      <group ref={yaw}>
        <Turret />

        <group ref={shoulder} position-y={LINK.base}>
          <Upper />

          <group ref={elbow} position-z={LINK.upper}>
            <Fore />

            <group ref={wrist} position-z={LINK.fore}>
              <Gripper />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export { Arm };
