import React from 'react';

// Routes
import { Navigate, Outlet, useParams } from '@/router';

// Catalog
import { GROUP, TYPES } from '@/views/experiments/music-visualiser/catalog';

// Constants
import { PARAMS, toPath } from '@/views/experiments/music-visualiser/constants';

/** `/:type` - an unknown category goes back to the station. */
const Contents: React.FunctionComponent = () => {
  const { [PARAMS.type]: type } = useParams();

  if (!type || !TYPES.includes(type)) {
    return <Navigate to={toPath({ group: GROUP })} replace />;
  }

  return <Outlet />;
};

export { Contents };
