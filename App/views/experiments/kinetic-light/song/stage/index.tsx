import React from 'react';

// Partials
import { Picture } from './picture';
import { Provider } from './context';

const Stage: React.FunctionComponent = () => {
  return (
    <Provider>
      <Picture />
    </Provider>
  );
};

export { Stage };
