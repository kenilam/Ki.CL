import React from 'react';

// Partials
import { Visualiser } from '@/views/experiments/music-visualiser/visualiser';
import { Provider } from './context';

const Picture: React.FunctionComponent = () => {
  return (
    <Provider>
      <Visualiser />
    </Provider>
  );
};

export { Picture };
