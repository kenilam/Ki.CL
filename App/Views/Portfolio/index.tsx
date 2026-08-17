import React, { Suspense } from 'react';

// Routes
import { Navigate, Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Views
import Pika from './Pika';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() => import('./Contents'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

export { PATH };
export default (
  <Route path={PATH} element={<Lazy />}>
    <Route index element={<Navigate replace to='..' />} />
    {Pika}
  </Route>
);
