import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(async () => {
  const { Daylight } = await import('./contents');

  return { default: Daylight };
});

const Lazy: React.FunctionComponent = () => (
  <Suspense fallback={<Spinner />}>
    <Contents />
  </Suspense>
);

const Daylight = <Route path={PATH} element={<Lazy />} />;

export { PATH, Daylight };
