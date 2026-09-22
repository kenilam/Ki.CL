import React, { Suspense } from 'react';

// Routes
import { Route } from '@/router';

// Components
import { Spinner } from '@/components';

// Partials
import { AnyTrack } from './any-track';

// Track
import { Track } from './track';

// Constants
import { PARAMS } from '@/views/experiments/music-visualiser/constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ Contents }) => ({ default: Contents }))
);

const Lazy: React.FunctionComponent = () => (
  <Suspense fallback={<Spinner position='inline' />}>
    <Contents />
  </Suspense>
);

/** `/:type` - a category of the station; its index goes to one of its tracks. */
const Types = (
  <Route path={`:${PARAMS.type}`} element={<Lazy />}>
    <Route index element={<AnyTrack />} />
    {Track}
  </Route>
);

export { Types };
