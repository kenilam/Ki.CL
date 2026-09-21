import React, { Suspense } from 'react';

// Routes
import { Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Groups
import Groups from './Groups';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() => import('./Contents'));
const Home = React.lazy(() => import('./Home'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Contents />
    </Suspense>
  );
};

/**
 * `/experiments/music-visualiser`, then `/:group/:type/:track/play` beneath
 * it, each level in its own folder. The index is Home; a group's and a
 * type's index redirect down to a track; the track owns the music and the
 * picture, and `/play` beneath it is what makes them sound.
 */
export { PATH };
export default (
  <Route path={PATH} element={<Lazy />}>
    <Route
      index
      element={
        <Suspense fallback={<Spinner position='inline' />}>
          <Home />
        </Suspense>
      }
    />
    {Groups}
  </Route>
);
