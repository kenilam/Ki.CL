import React from 'react';

// Partials
import { Dialog } from './dialog';
import { Open } from './open';
import { Provider } from './context';

const Delete: React.FunctionComponent = () => {
  return (
    <Provider>
      <Open />
      <Dialog />
    </Provider>
  );
};

export { Delete };
