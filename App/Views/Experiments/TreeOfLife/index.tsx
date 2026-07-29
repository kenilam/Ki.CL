import React, { Suspense } from 'react';

// Routes
import { Navigate, Outlet, Route as Origin } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Context
import TreeOfLifeProvider from './Context';

// Constants
import { NODE_PATTERN, PATH, ROOT_NODE_ID, toPath } from './constants';

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
      <Outlet />
    </TreeOfLifeProvider>
  );
};

export { PATH };
export default (
  <Origin path={PATH} element={<Provider />}>
    {/*
      The view is always focused on a node, so the bare path is not a place
      the user stays — it resolves onto the origin of life. `replace` keeps it
      out of history, so Back from the root leaves the experiment instead of
      bouncing through the redirect.
    */}
    <Origin index element={<Navigate replace to={toPath(ROOT_NODE_ID)} />} />
    <Origin path={NODE_PATTERN} element={<Lazy />} />
  </Origin>
);
