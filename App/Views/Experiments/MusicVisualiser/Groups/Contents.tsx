import React from 'react';

// Routes
import { Navigate, Outlet, useParams } from '@/Router';

// Providers
import radio from '@/Views/Experiments/MusicVisualiser/Providers';

// Constants
import { PARAMS, toPath } from '@/Views/Experiments/MusicVisualiser/constants';

type Params = { [PARAMS.group]?: string };

/**
 * `/:group` - a station. An unknown group goes to the first one; a known
 * one renders whatever is beneath it.
 */
const Contents: React.FunctionComponent = () => {
  const params = useParams<Params>();
  const group = params[PARAMS.group];

  if (!group || !radio.group(group)) {
    return <Navigate to={toPath({ group: radio.groups[0].group })} replace />;
  }

  return <Outlet />;
};

export default Contents;
