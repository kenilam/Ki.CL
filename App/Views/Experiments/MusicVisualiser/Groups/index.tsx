import React, { Suspense } from 'react';

// Routes
import { Navigate, Route, useParams } from '@/Router';

// Components
import { Spinner } from '@/Components';

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

const Contents = React.lazy(() => import('./Contents'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Contents />
    </Suspense>
  );
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

/** `/:group` - a station; its index redirects to its first type. */
export default (
  <Route path={GROUP_PATTERN} element={<Lazy />}>
    <Route index element={<FirstType />} />
    {Types}
  </Route>
);
