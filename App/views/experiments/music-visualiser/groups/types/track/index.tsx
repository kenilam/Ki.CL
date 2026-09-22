import React, { Suspense } from 'react';

// Routes
import { Route } from '@/router';

// Components
import { Spinner } from '@/components';

// Play
import { Play } from './play';

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

/** `/:track` - one track: its gate, and `/play` beneath it. */
const Track = (
  <Route path={`:${PARAMS.track}`} element={<Lazy />}>
    {Play}
  </Route>
);

export { Track };
