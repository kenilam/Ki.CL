import React from 'react';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Partials
import { useKeys } from './keys';
import { Obstacle } from './obstacle';

/**
 * The obstacles in the cell. Clicking one selects it, and the arrow keys or
 * the arrows round it move it; Delete takes it away.
 */
const Obstacles: React.FunctionComponent = () => {
  const { standing } = useFactoryArmContext();

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
