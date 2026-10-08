import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Groups
import { Groups } from './groups';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(async () => {
  const { MusicVisualiser } = await import('./contents');

  return { default: MusicVisualiser };
});
const Home = React.lazy(async () => {
  const { Home } = await import('./home');

  return { default: Home };
});

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
const MusicVisualiser = (
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

export { PATH, MusicVisualiser };
