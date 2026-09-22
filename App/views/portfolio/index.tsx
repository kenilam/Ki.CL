import React, { Suspense } from 'react';

// Routes
import { Navigate, Route } from '@/router';

// Components
import { Spinner } from '@/components';

// Views
import { Pika } from './pika';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ Portfolio }) => ({ default: Portfolio }))
);

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

const Portfolio = (
  <Route path={PATH} element={<Lazy />}>
    <Route index element={<Navigate replace to='..' />} />
    {Pika}
  </Route>
);

export { PATH, Portfolio };
