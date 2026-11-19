import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Views
import { SpatialCss } from './spatial-css';

// Constants
import { PATH } from './constants';

const Home = React.lazy(async () => {
  const { Home } = await import('./home');

  return { default: Home };
});

const Blog = (
  <Route path={PATH}>
    <Route
      index
      element={
        <Suspense fallback={<Spinner />}>
          <Home />
        </Suspense>
      }
    />
    {SpatialCss}
  </Route>
);

export { PATH, Blog };
