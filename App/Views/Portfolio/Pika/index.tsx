import React, { Suspense } from 'react';

// Routes
import { Navigate, Outlet, Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Views
import SystemDesign from './SystemDesign';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() => import('./Contents'));

/**
 * Credential gate for every child route. The index redirect stays outside the
 * gate on purpose — /portfolio/pika itself has nothing to protect, it only
 * bounces to its parent.
 */
const Gate: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

export { PATH };
export default (
  <Route path={PATH} element={<Outlet />}>
    <Route index element={<Navigate replace to='system-design' />} />
    <Route element={<Gate />}>{SystemDesign}</Route>
  </Route>
);
