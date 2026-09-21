import React from 'react';

// Routes
import { Navigate, Outlet, useParams } from '@/Router';

// Resolve
import resolve, { type Params } from './resolve';

// Constants
import { toPath } from '@/Views/Experiments/MusicVisualiser/constants';

/**
 * `/:group/:type` - a family within a station. An unknown type goes to the
 * group's first; a known one renders whatever is beneath it.
 */
const Contents: React.FunctionComponent = () => {
  const { group, provider, type } = resolve(useParams<Params>());

  if (!provider) {
    return <Navigate to={toPath()} replace />;
  }

  if (!type) {
    return <Navigate to={toPath({ group })} replace />;
  }

  return <Outlet />;
};

export default Contents;
