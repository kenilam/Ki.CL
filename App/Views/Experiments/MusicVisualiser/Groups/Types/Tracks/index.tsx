import React, { Suspense } from 'react';

// Routes
import { Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Play
import Play from './Play';

// Constants
import { TRACK_PATTERN } from '@/Views/Experiments/MusicVisualiser/constants';

const Contents = React.lazy(() => import('./Contents'));
const Home = React.lazy(() => import('./Home'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Contents />
    </Suspense>
  );
};

const LazyHome: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Home />
    </Suspense>
  );
};

/** `/:group/:type/:trackId` - a piece; its index is its Home, `/play` plays it. */
export default (
  <Route path={TRACK_PATTERN} element={<Lazy />}>
    <Route index element={<LazyHome />} />
    {Play}
  </Route>
);
