import React, { useRef } from 'react';

// Libraries
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

// World
import type { Walker } from '../world';

// Constants
import { COLOURS } from '../constants';

const BODY = { radius: 0.22, length: 1.1 };
const HEAD = 0.13;

/** A person walking their path: a capsule with a head, bobbing as they step. */
const Worker: React.FunctionComponent<{ worker: Walker }> = ({ worker }) => {
  const group = useRef<Group>(null);

  useFrame(() => {
    if (group.current) {
      group.current.position.set(
        worker.position.x,
        Math.abs(Math.sin(worker.travelled * 4)) * 0.04,
        worker.position.z
      );
      group.current.rotation.y = worker.heading;
    }
  });

  return (
    <group ref={group}>
      <mesh castShadow position-y={BODY.radius + BODY.length / 2}>
        <capsuleGeometry args={[BODY.radius, BODY.length, 6, 16]} />
        <meshStandardMaterial color={COLOURS.worker} />
      </mesh>
      <mesh castShadow position-y={BODY.radius * 2 + BODY.length + HEAD}>
        <sphereGeometry args={[HEAD, 16, 12]} />
        <meshStandardMaterial color={COLOURS.skin} />
      </mesh>
    </group>
  );
};

export { Worker };
