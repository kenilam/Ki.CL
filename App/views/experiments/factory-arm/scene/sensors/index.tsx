import React from 'react';

// Three
import { Fiber } from '@/three';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Obstacles
import { OBSTACLES } from '@/views/experiments/factory-arm/scene/obstacles/constants';

// Sense
import { sense } from './sense';

/**
 * Reads every sensor each frame. An obstacle any of them sees for the first
 * time joins what the arm knows, and `found` goes up once for the frame, so
 * the arm checks its way again once however many were found together.
 */
const Sensing: React.FunctionComponent = () => {
  const { found, joints, known, seeing } = useFactoryArmContext();

  Fiber.useFrame(() => {
    const seen = sense(joints.current, OBSTACLES);
    let grew = false;

    seeing.current = new Set(seen.keys());

    seen.forEach((ids) =>
      ids.forEach((id) => {
        if (!known.current.has(id)) {
          known.current.add(id);
          grew = true;
        }
      })
    );

    if (grew) {
      found.current += 1;
    }
  });

  return null;
};

export { Mounts } from './mounts';
export { Sensing };
