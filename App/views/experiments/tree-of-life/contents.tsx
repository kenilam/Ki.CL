import React from 'react';

// Routes
import { Outlet } from '@/router';

// Session
import { Session } from '@/session';

// Context
import { TreeOfLifeProvider } from './context';

/**
 * Kept in the lazy chunk so the context ships with the route that uses it.
 * The session sits above every version, so an archived one opened first still
 * has one.
 */
const TreeOfLife: React.FunctionComponent = () => (
  <TreeOfLifeProvider>
    <Session>
      <Outlet />
    </Session>
  </TreeOfLifeProvider>
);

export { TreeOfLife };
