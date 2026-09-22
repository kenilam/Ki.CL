import React from 'react';

// Routes
import { Navigate, Outlet, useParams } from '@/router';

// Catalog
import { GROUP } from '@/views/experiments/music-visualiser/catalog';

// Constants
import { PARAMS, toPath } from '@/views/experiments/music-visualiser/constants';

/** `/:group` - there is one station; any other group goes back to the view. */
const Contents: React.FunctionComponent = () => {
  const { [PARAMS.group]: group } = useParams();

  if (group !== GROUP) {
    return <Navigate to={toPath()} replace />;
  }

  return <Outlet />;
};

export { Contents };
