import React, { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Model
import { LINK } from 'arm/model/constants';
import { HOME } from 'arm/model/kinematics';

// Protocol
import type { Joints } from 'arm/protocol';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { Fore } from './fore';
import { Gripper } from './gripper';
import { Pedestal } from './pedestal';
import { Target } from './target';
import { Turret } from './turret';
import { Upper } from './upper';

/** How fast the drawn arm closes on the last telemetry, per second. */
const CATCH = 30;

type Props = { arm: string };

/**
 * One arm, drawn from its controller's telemetry. Telemetry comes at 60 Hz
 * from another thread, so each joint eases toward the last report rather
 * than jumping to it. Each link points down its own +z, and each joint
 * pitches about its own x: a positive `rotation.x` turns +z downward, so
 * pitching up is negative.
 */
const Arm: React.FunctionComponent<Props> = ({ arm }) => {
  const { drawn, telemetry } = useHub();
  const joints = useRef<Joints>(HOME);
  const yaw = useRef<THREE.Group>(null);
  const shoulder = useRef<THREE.Group>(null);
  const elbow = useRef<THREE.Group>(null);
  const wrist = useRef<THREE.Group>(null);

  Fiber.useFrame((_, delta) => {
    const latest = telemetry.current.get(arm)?.joints;

    if (!latest) {
      return;
    }

    const share = Math.min(1, delta * CATCH);
    const current = joints.current;

    joints.current = {
      yaw: current.yaw + (latest.yaw - current.yaw) * share,
      shoulder: current.shoulder + (latest.shoulder - current.shoulder) * share,
      elbow: current.elbow + (latest.elbow - current.elbow) * share,
      wrist: current.wrist + (latest.wrist - current.wrist) * share,
      roll: current.roll + (latest.roll - current.roll) * share,
      grip: latest.grip,
    };

    const next = joints.current;

    // What hangs from the pad is drawn from these same joints, so it never runs ahead of the gripper.
    drawn.current.set(arm, next);

    if (yaw.current && shoulder.current && elbow.current && wrist.current) {
      yaw.current.rotation.y = next.yaw;
      shoulder.current.rotation.x = -next.shoulder;
      elbow.current.rotation.x = next.elbow;
      wrist.current.rotation.x = -next.wrist;
    }
  }, -1);

  return (
    <group>
      <Pedestal />
      <Target arm={arm} />

      <group ref={yaw}>
        <Turret />

        <group ref={shoulder} position-y={LINK.base}>
          <Upper />

          <group ref={elbow} position-z={LINK.upper}>
            <Fore />

            <group ref={wrist} position-z={LINK.fore}>
              <Gripper joints={joints} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

export { Arm };
