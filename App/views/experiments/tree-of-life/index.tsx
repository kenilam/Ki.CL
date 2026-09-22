import React, { Suspense } from 'react';

// Routes
import { Route } from '@/router';

// Components
import { Spinner } from '@/components';

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

const TreeOfLife = (
  <Route path={PATH} element={<Lazy />}>
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
