import React, { Suspense } from 'react';

// Routes
import { Navigate, Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Providers
import radio from './Providers';

// Groups
import Groups from './Groups';

// Constants
import { PATH, toPath } from './constants';

const Contents = React.lazy(() => import('./Contents'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Contents />
    </Suspense>
  );
};

/**
 * `/experiments/music-visualiser`, then `/:group/:type/:trackId` beneath
 * it, each level in its own folder. The shell - stage, chrome, playback -
 * is this route's element and renders an outlet, so the URL can descend
 * and change beneath it without the player ever remounting. Every index
 * redirects to its first child: here, to the first group.
 */
export { PATH };
export default (
  <Route path={PATH} element={<Lazy />}>
    <Route
      index
      element={
        <Navigate to={toPath({ group: radio.groups[0].group })} replace />
      }
    />
    {Groups}
  </Route>
);
