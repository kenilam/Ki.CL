import React from 'react';

// Partials
import { Orb } from '@/views/experiments/daylight/orb';
import { Provider } from './context';

/** The drawing with no places marked, for the experiments home. */
const Plate: React.FunctionComponent = () => {
  return (
    <Provider>
      <Orb />
    </Provider>
  );
};

export { Plate };
