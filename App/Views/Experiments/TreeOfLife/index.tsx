import React, { Suspense } from 'react';

// Routes
import { Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Context
import TreeOfLifeProvider from './Context';

// Versions
import Versions from './Versions';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() => import('./Contents'));

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

export { PATH };
export default (
  <Route path={PATH} element={<Provider />}>
    <Route
      index
      lazy={async () => {
        const { default: Component } = await import('./Home');

        return { Component };
      }}
    />
    {Versions}
  </Route>
);
