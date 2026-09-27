import React, { useRef } from 'react';

// Three
import { Drei, Fiber, THREE } from '@/three';

// Components
import { Badge } from '@/components';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Pad
import { top } from '@/views/experiments/factory-arm/scene/grasp/pad';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

/** How far above the case's top the notice floats, in metres. */
const RISE = 0.35;

/**
 * A badge saying a case has no clear path, floating over that case and
 * following it if it moves. It is the page's `Alert` that screen readers
 * hear; this one is for the eye, and lets clicks through to the scene.
 */
const Notice: React.FunctionComponent = () => {
  const { bodies, skipped, stopped } = useFactoryArmContext();

  const anchor = useRef<THREE.Group>(null);

  Fiber.useFrame(() => {
    const entry = skipped ? bodies.current.get(skipped) : undefined;

    if (anchor.current && entry) {
      const { x, y, z } = top(entry.body, entry.box);

      anchor.current.position.set(x, y + RISE, z);
    }
  });

  if (!skipped || stopped) {
    return null;
  }

  return (
    <group ref={anchor}>
      <Drei.Html
        aria-hidden
        center
        // Sized to the badge: the wrapper has no width of its own, and a badge
        // fits its container, so it would otherwise break every letter.
        style={{ inlineSize: 'max-content', pointerEvents: 'none' }}
      >
        <Badge className='kicl-text-nowrap' rounded variant='warning'>
          {COPY.skipped}
        </Badge>
      </Drei.Html>
    </group>
  );
};

export { Notice };
