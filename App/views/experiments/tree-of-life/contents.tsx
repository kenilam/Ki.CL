import React from 'react';

// Routes
import { Outlet } from 'design/router';

// Context
import { Provider as AnimateProvider } from './animate-context';
import { Provider as LineageProvider } from './lineage-context';
import { Provider as SubtreeProvider } from './subtree-context';

/** Kept in the lazy chunk so the context ships with the route that uses it. */
const TreeOfLife: React.FunctionComponent = () => {
  return (
    <SubtreeProvider>
      <LineageProvider>
        <AnimateProvider>
          <Outlet />
        </AnimateProvider>
      </LineageProvider>
    </SubtreeProvider>
  );
};

export { TreeOfLife };
