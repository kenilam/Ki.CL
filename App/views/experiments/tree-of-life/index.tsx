import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Versions
import { Details } from './explorer/details';
import { VersionsRedirect } from './redirect';

// Constants
import { NODE_PATTERN, PATH } from './constants';

const Contents = React.lazy(async () => {
  const { TreeOfLife } = await import('./contents');

  return { default: TreeOfLife };
});

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
    <Route
      path={NODE_PATTERN}
      lazy={async () => ({
        Component: (await import('./explorer')).Canvas,
      })}
    >
      {Details}
    </Route>
    {VersionsRedirect}
  </Route>
);

export { PATH, TreeOfLife };
