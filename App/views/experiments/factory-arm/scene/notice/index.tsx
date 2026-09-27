import React, { useRef } from 'react';

// Three
import { Drei, Fiber, THREE } from '@/three';

// Components
import { Animation, Badge } from '@/components';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

/**
 * A badge saying a case has no clear path, on that case and following it if
 * it moves. It is the page's `Alert` that screen readers
 * hear; this one is for the eye, and lets clicks through to the scene.
 */
const Notice: React.FunctionComponent = () => {
  const { bodies, skipped, stopped } = useFactoryArmContext();

  const anchor = useRef<THREE.Group>(null);

  // On the case itself: above it, a buried case's badge lands among the
  // cases on top. It's drawn over the scene, so it shows through them.
  Fiber.useFrame(() => {
    const entry = skipped ? bodies.current.get(skipped) : undefined;

    if (anchor.current && entry) {
      const { x, y, z } = entry.body.translation();

      anchor.current.position.set(x, y, z);
    }
  });

  if (!skipped || stopped) {
    return null;
  }

  return (
    <group ref={anchor}>
      <Drei.Html aria-hidden center>
        <Animation property='slide-from-bottom'>
          <Badge
            className='kicl-text-nowrap'
            level='warning'
            size='small'
            variant='secondary'
          >
            {COPY.skipped}
          </Badge>
        </Animation>
      </Drei.Html>
    </group>
  );
};

export { Notice };
