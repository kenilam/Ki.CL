import React from 'react';

// Partials
import { Entrance } from './entrance';

// Context
import { Provider } from './context';

const Contents: React.FunctionComponent = () => {
  return (
    <Provider>
      <Entrance />
    </Provider>
  );
};

export { Contents };
