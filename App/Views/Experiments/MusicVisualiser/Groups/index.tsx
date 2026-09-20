import React from 'react';

// Routes
import { Navigate, Outlet, Route, useParams } from '@/Router';

// Providers
import radio from '@/Views/Experiments/MusicVisualiser/Providers';

// Types
import Types from './Types';

// Constants
import {
  GROUP_PATTERN,
  PARAMS,
  toPath,
} from '@/Views/Experiments/MusicVisualiser/constants';

type Params = { [PARAMS.group]?: string };

/**
 * `/:group` - a station. An unknown group goes to the first one; a known
 * one renders whatever is beneath it.
 */
const Group: React.FunctionComponent = () => {
  const params = useParams<Params>();
  const group = params[PARAMS.group];

  if (!group || !radio.group(group)) {
    return <Navigate to={toPath({ group: radio.groups[0].group })} replace />;
  }

  return <Outlet />;
};

/** The group's index: its first type. */
const FirstType: React.FunctionComponent = () => {
  const params = useParams<Params>();
  const group = params[PARAMS.group];
  const provider = group ? radio.group(group) : undefined;

  if (!provider) {
    return <Navigate to={toPath()} replace />;
  }

  return <Navigate to={toPath({ group, type: provider.types[0] })} replace />;
};

export default (
  <Route path={GROUP_PATTERN} element={<Group />}>
    <Route index element={<FirstType />} />
    {Types}
  </Route>
);
