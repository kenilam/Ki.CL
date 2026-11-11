import React from 'react';

// Partials
import { Picture } from './picture';
import { Provider } from './context';

const Backdrop: React.FunctionComponent = () => {
  return (
    <Provider>
      <Picture />
    </Provider>
  );
};

export { Backdrop };
