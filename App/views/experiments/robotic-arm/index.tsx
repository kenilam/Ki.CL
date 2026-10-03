import React, { Suspense } from 'react';

// Routes
import { Route } from '@/router';

// Components
import { Spinner } from '@/components';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ RoboticArm }) => ({ default: RoboticArm }))
);

/** `/experiments/robotic-arm`: the factory floor. */
const RoboticArm = (
  <Route
    path={PATH}
    element={
      <Suspense fallback={<Spinner position='inline' />}>
        <Contents />
      </Suspense>
    }
  />
);

export { PATH, RoboticArm };
