import React from 'react';

// Routes
import { Navigate, Outlet, useParams } from '@/Router';

// Catalog
import { GROUP } from '@/Views/Experiments/MusicVisualiser/Catalog';

// Constants
import { PARAMS, toPath } from '@/Views/Experiments/MusicVisualiser/constants';

/** `/:group` - there is one station; any other group goes back to the view. */
const Contents: React.FunctionComponent = () => {
  const { [PARAMS.group]: group } = useParams();

  if (group !== GROUP) {
    return <Navigate to={toPath()} replace />;
  }

  return <Outlet />;
};

export default Contents;
