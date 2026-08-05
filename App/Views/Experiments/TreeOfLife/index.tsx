import React, { Suspense } from 'react';

// Routes
import { Route as Origin } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Context
import TreeOfLifeProvider from './Context';

// Versions
import Versions, { routes as versionRoutes } from './Versions';

// Constants
import { PATH } from './constants';

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
      {/*
        The session gate sits above every version, so opening an archived one
        first establishes a session rather than relying on a previous visit
        through the live view having left one behind.
      */}
      <Lazy />
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
      Every view of the tree is a version, including the current one — there is
      no unversioned node route, so a link always says which attempt it means.
    */}
    {versionRoutes}
  </Origin>
);
