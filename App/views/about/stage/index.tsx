import React from 'react';

import { Provider } from './context';
import { Scene } from './scene';

const Stage: React.FunctionComponent = () => {
  return (
    <Provider>
      <Scene />
    </Provider>
  );
};

export { Stage };
