import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(async () => {
  const { CssOnly } = await import('./contents');

  return { default: CssOnly };
});

const Lazy: React.FunctionComponent = () => (
  <Suspense fallback={<Spinner />}>
    <Contents />
  </Suspense>
);

const CssOnly = <Route path={PATH} element={<Lazy />} />;

export { PATH, CssOnly };
