import React from 'react';

// Context
import { Provider } from './context';

// Partials
import { Cases } from './cases';
import { Runner } from './runner';

/** The engine: the cases, placed where it says, and the runner that plans and plays each job. */
const Engine: React.FunctionComponent = () => {
  return (
    <Provider>
      <Cases />
      <Runner />
    </Provider>
  );
};

export { Engine };
