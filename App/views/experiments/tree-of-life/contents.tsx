import React from 'react';

// Routes
import { Outlet } from '@/router';

// Context
import { TreeOfLifeProvider } from './context';

/** Kept in the lazy chunk so the context ships with the route that uses it. */
const TreeOfLife: React.FunctionComponent = () => (
  <TreeOfLifeProvider>
    <Outlet />
  </TreeOfLifeProvider>
);

export { TreeOfLife };
