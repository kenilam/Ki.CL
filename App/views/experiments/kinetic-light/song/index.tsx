import React, { Suspense } from 'react';

// Routes
import { Outlet, Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PARAM } from '@/views/experiments/kinetic-light/constants';

const Player = React.lazy(async () => {
  const { Player } =
    await import('@/views/experiments/kinetic-light/song/player');

  return { default: Player };
});

const Stage = React.lazy(async () => {
  const { Stage } =
    await import('@/views/experiments/kinetic-light/song/stage');

  return { default: Stage };
});

const Song = (
  <Route
    path={`:${PARAM}`}
    element={
      <Suspense fallback={<Spinner position='inline' />}>
        <Player>
          <Outlet />
        </Player>
      </Suspense>
    }
  >
    <Route index element={<Stage />} />
  </Route>
);

export { Song };
