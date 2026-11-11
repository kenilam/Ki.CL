import React from 'react';

// Partials
import { Orb } from '@/views/experiments/daylight/orb';
import { Provider } from './context';

const Globe: React.FunctionComponent = () => {
  return (
    <Provider>
      <Orb />
    </Provider>
  );
};

export { Globe };
