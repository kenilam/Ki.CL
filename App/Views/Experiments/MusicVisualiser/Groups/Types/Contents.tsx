import React from 'react';

// Routes
import { Navigate, Outlet, useParams } from '@/Router';

// Catalog
import { GROUP, TYPES } from '@/Views/Experiments/MusicVisualiser/Catalog';

// Constants
import { PARAMS, toPath } from '@/Views/Experiments/MusicVisualiser/constants';

/** `/:type` - an unknown category goes back to the station. */
const Contents: React.FunctionComponent = () => {
  const { [PARAMS.type]: type } = useParams();

  if (!type || !TYPES.includes(type)) {
    return <Navigate to={toPath({ group: GROUP })} replace />;
  }

  return <Outlet />;
};

export default Contents;
