import React, { Suspense } from 'react';

// Routes
import { Route } from '@/router';

// Components
import { Spinner } from '@/components';

// Groups
import { Groups } from './groups';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ MusicVisualiser }) => ({
    default: MusicVisualiser,
  }))
);
const Home = React.lazy(() =>
  import('./home').then(({ Home }) => ({ default: Home }))
);

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
