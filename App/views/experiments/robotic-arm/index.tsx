import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

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
