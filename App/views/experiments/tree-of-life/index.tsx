import React, { Suspense } from 'react';

// Routes
import { Route } from '@/router';

// Components
import { Spinner } from '@/components';

// Context
import { TreeOfLifeProvider } from './context';

// Versions
import { Versions } from './versions';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ TreeOfLife }) => ({ default: TreeOfLife }))
);

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Contents />
    </Suspense>
  );
};

const Provider: React.FunctionComponent = () => {
  return (
    <TreeOfLifeProvider>
      <Lazy />
    </TreeOfLifeProvider>
  );
};

const TreeOfLife = (
  <Route path={PATH} element={<Provider />}>
    <Route
      index
      lazy={async () => {
        const { Home: Component } = await import('./home');

        return { Component };
      }}
    />
    {Versions}
  </Route>
);

export { PATH, TreeOfLife };
