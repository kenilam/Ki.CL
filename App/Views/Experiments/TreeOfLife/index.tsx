import React, { Suspense } from 'react';

// Routes
import { Outlet, Route as Origin } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Context
import TreeOfLifeProvider from './Context';

// Versions
import Versions, { routes as versionRoutes } from './Versions';

// Constants
import { NODE_PATTERN, PATH } from './constants';

const Contents = React.lazy(() => import('./Contents'));
const Landing = React.lazy(() => import('./Landing'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Contents />
    </Suspense>
  );
};

const Introduction: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Landing />
    </Suspense>
  );
};

const Provider: React.FunctionComponent = () => {
  return (
    <TreeOfLifeProvider>
      <Outlet />
      <Versions />
    </TreeOfLifeProvider>
  );
};

export { PATH };
export default (
  <Origin path={PATH} element={<Provider />}>
    {/*
      The bare path introduces the experiment rather than redirecting into it.
      Dropping somebody straight onto the origin of life left them inside a 3D
      scene with no idea what they were looking at or why there were fifteen
      versions of it.
    */}
    <Origin index element={<Introduction />} />

    {/*
      Declared before the node route for readability only — the router ranks a
      literal segment above a dynamic one whatever the order, so
      `/tree-of-life/v3/ott123` reaches an earlier version while
      `/tree-of-life/ott123` still reaches the current view.
    */}
    {versionRoutes}

    <Origin path={NODE_PATTERN} element={<Lazy />} />
  </Origin>
);
