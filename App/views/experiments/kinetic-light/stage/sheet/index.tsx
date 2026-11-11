import React from 'react';

// Partials
import { Copies } from './copies';
import { Provider } from './context';

const Sheet: React.FunctionComponent = () => {
  return (
    <Provider>
      <Copies />
    </Provider>
  );
};

export { Sheet };
