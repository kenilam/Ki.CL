import React from 'react';

import { Orb } from '@/views/experiments/daylight/orb';

import { Provider } from './context';

const Preview: React.FunctionComponent = () => {
  return (
    <Provider>
      <Orb />
    </Provider>
  );
};

export { Preview };
