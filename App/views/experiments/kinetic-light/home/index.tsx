import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

const Contents = React.lazy(async () => {
  const { Contents } = await import('./contents');

  return { default: Contents };
});

const Home = (
  <Route
    index
    element={
      <Suspense fallback={<Spinner position='inline' />}>
        <Contents />
      </Suspense>
    }
  />
);

export { Home };
