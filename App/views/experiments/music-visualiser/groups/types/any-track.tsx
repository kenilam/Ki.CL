import React, { useState } from 'react';

// Routes
import { Navigate, useParams } from '@/router';

// Catalog
import { draw } from '@/views/experiments/music-visualiser/catalog';

// Constants
import {
  PARAMS,
  toTrackPath,
} from '@/views/experiments/music-visualiser/constants';

/** The type's index: a track of it, drawn at random. */
const AnyTrack: React.FunctionComponent = () => {
  const { [PARAMS.type]: type } = useParams();
  const [track] = useState(() => draw({ type }));

  return <Navigate to={toTrackPath(track)} replace />;
};

export { AnyTrack };
