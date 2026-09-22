import React, { Suspense } from 'react';

// Routes
import { Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Play
import { Play } from './Play';

// Constants
import { PARAMS } from '@/Views/Experiments/MusicVisualiser/constants';

const Contents = React.lazy(() =>
  import('./Contents').then(({ Contents }) => ({ default: Contents }))
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
