import React, { Suspense } from 'react';

// Routes
import { Navigate, Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Views
import { Moonshot } from './moonshot';
import { Pika } from './pika';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(async () => {
  const { Portfolio } = await import('./contents');

  return { default: Portfolio };
});

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
    {Moonshot}
    {Pika}
  </Route>
);

export { PATH, Portfolio };
