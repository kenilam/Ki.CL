import React, { useCallback, useMemo, useRef } from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

// Grid and robot
import { toPoint } from 'arm/grid';
import { JOINTS } from 'arm/robot';

// World
import type { Arm as Plant } from '@/views/experiments/robotic-arm/floor/world';

// Partials
import { Segment } from './segment';

// Constants
import { COLOURS } from '@/views/experiments/robotic-arm/floor/constants';

/** Drawn under the base joint, whose origin in the spec already stands on it. */
const PEDESTAL = { radius: 0.4, height: JOINTS[0].origin[1] };

/** One arm on its cell's centre hex, following the joint angles in its pose. */
/** `twinned`: driven by physical AI on the twin, and drawn in its own colour. */
const Arm: React.FunctionComponent<{ arm: Plant; twinned?: boolean }> = ({
  arm,
  twinned = false,
}) => {
  const joints = useRef<(Group | null)[]>([]);
  const attach = useCallback((index: number, group: Group | null) => {
    joints.current[index] = group;
  }, []);
  const at = useMemo(() => toPoint(arm.cell), [arm.cell]);

  useFrame(() => {
    JOINTS.forEach(({ axis, name }, index) => {
      const group = joints.current[index];

      if (group) {
        group.rotation[axis] = arm.pose[name];
      }
    });
  });

  return (
    <group position={[at.x, 0, at.z]} rotation-y={arm.heading}>
      <mesh castShadow position-y={PEDESTAL.height / 2} receiveShadow>
        <cylinderGeometry
          args={[PEDESTAL.radius, PEDESTAL.radius * 1.2, PEDESTAL.height, 32]}
        />
        <meshStandardMaterial color={COLOURS.joint} />
      </mesh>
      <Segment
        attach={attach}
        colour={twinned ? COLOURS.twinned : COLOURS.arm}
        index={0}
      />
    </group>
  );
};

export { Arm };
