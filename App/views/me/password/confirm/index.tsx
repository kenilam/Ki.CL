import React from 'react';

// Partials
import { Card } from './card';
import { Provider } from './context';

/** Where the emailed link lands. */
const Confirm: React.FunctionComponent = () => {
  return (
    <Provider>
      <Card />
    </Provider>
  );
};

export { Confirm };
