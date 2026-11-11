import React from 'react';

// Context
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

// Partials
import { useKeys } from './use-keys';
import { Obstacle } from './obstacle';

/**
 * The obstacles in the cell. Clicking one selects it, and the arrow keys or
 * the arrows round it move it; Delete takes it away.
 */
const Obstacles: React.FunctionComponent = () => {
  const { standing } = useObstaclesContext();

  useKeys();

  return (
    <>
      {standing.map((id) => (
        <Obstacle id={id} key={id} />
      ))}
    </>
  );
};

export { Obstacles };
