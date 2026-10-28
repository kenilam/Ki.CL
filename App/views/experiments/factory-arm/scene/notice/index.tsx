import React, { useRef } from 'react';

// Three
import { Fiber, THREE } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Overlays
import { toAnchor } from '@/views/experiments/factory-arm/scene/overlays';

// Kinematics
import { forward } from '@/views/experiments/factory-arm/scene/arm/kinematics';

/**
 * Where the badge over what the arm can't do sits, following it if it moves:
 * the gripper when the arm has stopped with no clear way forward or back, or
 * a case with no clear path.
 */
const Notice: React.FunctionComponent = () => {
  const { bodies, joints, skipped, stopped } = useFactoryArmContext();

  const anchor = useRef<THREE.Group>(null);

  // On the case itself: above it, a buried case's badge lands among the
  // cases on top. It's drawn over the scene, so it shows through them.
  Fiber.useFrame(() => {
    const entry = skipped ? bodies.current.get(skipped) : undefined;
    const at = stopped ? forward(joints.current) : entry?.body.translation();

    if (anchor.current && at) {
      anchor.current.position.set(at.x, at.y, at.z);
    }
  });

  if (!skipped && !stopped) {
    return null;
  }

  return (
    <group
      ref={(node) => {
        anchor.current = node;
        toAnchor('notice')(node);
      }}
    />
  );
};

export { Notice };
