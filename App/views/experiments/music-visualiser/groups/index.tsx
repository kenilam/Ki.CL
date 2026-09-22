import React, { Suspense } from 'react';

// Routes
import { Navigate, Route } from '@/router';

// Components
import { Spinner } from '@/components';

// Catalog
import { GROUP, TYPES } from '@/views/experiments/music-visualiser/catalog';

// Types
import { Types } from './types';

// Constants
import { PARAMS, toPath } from '@/views/experiments/music-visualiser/constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ Contents }) => ({ default: Contents }))
);

const Lazy: React.FunctionComponent = () => (
  <Suspense fallback={<Spinner position='inline' />}>
    <Contents />
  </Suspense>
);

/** `/:group` - the station; its index goes to its first type. */
const Groups = (
  <Route path={`:${PARAMS.group}`} element={<Lazy />}>
    <Route
      index
      element={
        <Navigate to={toPath({ group: GROUP, type: TYPES[0] })} replace />
      }
    />
    {Types}
  </Route>
);

export { Groups };
