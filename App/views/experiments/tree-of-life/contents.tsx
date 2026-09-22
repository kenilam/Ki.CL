import React from 'react';

// Context
import { TreeOfLifeProvider } from './context';

// Session
import { Session } from './session';

/** Kept in the lazy chunk so the context ships with the route that uses it. */
const TreeOfLife: React.FunctionComponent = () => (
  <TreeOfLifeProvider>
    <Session />
  </TreeOfLifeProvider>
);

export { TreeOfLife };
