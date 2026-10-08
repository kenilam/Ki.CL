import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Views
import { Gate } from '@/views/portfolio/gate';

// Constants
import { PATH } from './constants';

/*
 * Loaded on first visit, not with Ki.CL: if the moonshot remote is down, only
 * this page fails.
 */
const Contents = React.lazy(async () => {
  const { Contents } = await import('./contents');

  return { default: Contents };
});

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

/** The moonshot exercise, from its remote, behind the portfolio sign-in. */
const Moonshot = (
  <Route path={PATH} element={<Gate path={PATH} />}>
    {/* A splat doesn't match the bare path, so the index is listed too. */}
    <Route index element={<Lazy />} />
    <Route path='*' element={<Lazy />} />
  </Route>
);

export { Moonshot };
