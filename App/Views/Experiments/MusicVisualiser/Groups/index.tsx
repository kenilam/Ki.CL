import React, { Suspense } from 'react';

// Routes
import { Navigate, Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Catalog
import { GROUP, TYPES } from '@/Views/Experiments/MusicVisualiser/Catalog';

// Types
import { Types } from './Types';

// Constants
import { PARAMS, toPath } from '@/Views/Experiments/MusicVisualiser/constants';

const Contents = React.lazy(() =>
  import('./Contents').then(({ Contents }) => ({ default: Contents }))
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
