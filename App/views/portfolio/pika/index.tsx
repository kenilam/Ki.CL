import React, { Suspense } from 'react';

// Routes
import { Navigate, Outlet, Route } from '@/router';

// Components
import { Spinner } from '@/components';

// Views
import { SystemDesign } from './system-design';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ Pika }) => ({ default: Pika }))
);

/**
 * Credential gate for every child route. The index redirect stays outside the
 * gate on purpose - /portfolio/pika itself has nothing to protect, it only
 * bounces to its parent.
 */
const Gate: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

const Pika = (
  <Route path={PATH} element={<Outlet />}>
    <Route index element={<Navigate replace to='system-design' />} />
    <Route element={<Gate />}>{SystemDesign}</Route>
  </Route>
);

export { PATH, Pika };
