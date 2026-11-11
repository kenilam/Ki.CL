import React from 'react';

// Three
import { Fiber } from '@/three';

// Context
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

// Partials
import { useDropped } from './use-dropped';
import { usePut } from './use-put';

/** Where a shape asked for from the panel goes, if there's room: in front, by the belt. */
const OPEN = { x: 1, z: 1.2 };

/**
 * Puts shapes from the panel on the stage: one dropped on the canvas where
 * it was dropped, one clicked in the panel in front by the belt. Either goes
 * to the nearest spot with room for it, and is selected so the operator can
 * move it straight away.
 */
const Drop: React.FunctionComponent = () => {
  const { asked } = useObstaclesContext();
  const put = usePut();

  Fiber.useFrame(() => {
    for (
      let shape = asked.current.shift();
      shape;
      shape = asked.current.shift()
    ) {
      put(shape, OPEN);
    }
  });

  useDropped(put);

  return null;
};

export { Drop };
