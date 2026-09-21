import React, { Suspense, useState } from 'react';

// Routes
import { Navigate, Route, useParams } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Catalog
import { draw } from '@/Views/Experiments/MusicVisualiser/Catalog';

// Track
import Track from './Track';

// Constants
import {
  PARAMS,
  toTrackPath,
} from '@/Views/Experiments/MusicVisualiser/constants';

const Contents = React.lazy(() => import('./Contents'));

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
export default (
  <Route path={`:${PARAMS.type}`} element={<Lazy />}>
    <Route index element={<AnyTrack />} />
    {Track}
  </Route>
);
