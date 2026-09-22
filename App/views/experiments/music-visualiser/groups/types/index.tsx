import React, { Suspense, useState } from 'react';

// Routes
import { Navigate, Route, useParams } from '@/router';

// Components
import { Spinner } from '@/components';

// Catalog
import { draw } from '@/views/experiments/music-visualiser/catalog';

// Track
import { Track } from './track';

// Constants
import {
  PARAMS,
  toTrackPath,
} from '@/views/experiments/music-visualiser/constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ Contents }) => ({ default: Contents }))
);

const Lazy: React.FunctionComponent = () => (
  <Suspense fallback={<Spinner position='inline' />}>
    <Contents />
  </Suspense>
);

/** The type's index: a track of it, drawn at random. */
const AnyTrack: React.FunctionComponent = () => {
  const { [PARAMS.type]: type } = useParams();
  const [track] = useState(() => draw({ type }));

  return <Navigate to={toTrackPath(track)} replace />;
};

/** `/:type` - a category of the station; its index goes to one of its tracks. */
const Types = (
  <Route path={`:${PARAMS.type}`} element={<Lazy />}>
    <Route index element={<AnyTrack />} />
    {Track}
  </Route>
);

export { Types };
