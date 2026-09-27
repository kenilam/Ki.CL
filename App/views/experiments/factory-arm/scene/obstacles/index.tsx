import React from 'react';

// Partials
import { useKeys } from './keys';
import { Obstacle } from './obstacle';

// Constants
import { OBSTACLES } from './constants';

/**
 * The obstacles. Clicking one selects it, and the arrow keys or the arrows
 * round it move it along the floor.
 */
const Obstacles: React.FunctionComponent = () => {
  useKeys();

  return (
    <>
      {OBSTACLES.map(({ id }) => (
        <Obstacle id={id} key={id} />
      ))}
    </>
  );
};

export { Obstacles };
