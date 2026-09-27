import React, { useRef } from 'react';

// Three
import { Drei, Fiber, THREE } from '@/three';

// Components
import { Animation, Badge } from '@/components';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Kinematics
import { forward } from '@/views/experiments/factory-arm/scene/arm/kinematics';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

/**
 * A badge over what the arm can't do, following it if it moves: over the
 * gripper when the arm has stopped with no clear way forward or back, or on
 * a case with no clear path. It is the page's `Alert` that screen readers
 * hear; this one is for the eye, and lets clicks through to the scene.
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
    <group ref={anchor}>
      <Drei.Html aria-hidden center>
        <Animation property='slide-from-bottom'>
          <Badge
            className='kicl-text-nowrap'
            level={stopped ? 'error' : 'warning'}
            size='small'
            variant='outline'
          >
            {stopped ? COPY.stopped.message : COPY.skipped}
          </Badge>
        </Animation>
      </Drei.Html>
    </group>
  );
};

export { Notice };
