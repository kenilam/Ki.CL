import React, { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Kinematics
import { solve, step } from './kinematics';

// Partials
import { Fore } from './fore';
import { Gripper } from './gripper';
import { Pedestal } from './pedestal';
import { Turret } from './turret';
import { Upper } from './upper';

// Constants
import { LINK } from './constants';

/*
 * Each link points down its own +z, and each joint pitches about its own x.
 * A positive `rotation.x` turns +z downward, so pitching up is negative.
 */
const Arm: React.FunctionComponent = () => {
  const { command, joints, write } = useFactoryArmContext();

  const yaw = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const wrist = useRef<THREE.Group>(null);

  Fiber.useFrame((_, delta) => {
    // Capped so a frame after a hidden tab does not jump the arm.
    const { facing, grip, target } = command.current;
    const goal = solve(target, grip, facing);
    const next = step(joints.current, goal, Math.min(delta, 0.1));

    write.joints(next);

    if (!yaw.current || !shoulder.current || !elbow.current || !wrist.current) {
      return;
    }

    yaw.current.rotation.y = next.yaw;
    shoulder.current.rotation.x = -next.shoulder;
    elbow.current.rotation.x = next.elbow;
    wrist.current.rotation.x = -next.wrist;
  });

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
