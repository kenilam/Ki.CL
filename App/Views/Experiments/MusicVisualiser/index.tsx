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
const Landing = React.lazy(() => import('./Landing'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Contents />
    </Suspense>
  );
};

/**
 * `/experiments/music-visualiser`, then `/:group/:type/:trackId/play`
 * beneath it, each level in its own folder. The shell - stage and radio -
 * is this route's element and renders an outlet, so the URL can descend
 * and change beneath it without the player ever remounting. The index is
 * a gate whose play control goes to the first group; the group's and the
 * type's index redirect to their first child; a track's route is a gate
 * to its play route, which plays.
 */
export { PATH };
export default (
  <Route path={PATH} element={<Lazy />}>
    <Route
      index
      element={
        <Suspense fallback={<Spinner position='inline' />}>
          <Landing />
        </Suspense>
      }
    />
    {Groups}
  </Route>
);
