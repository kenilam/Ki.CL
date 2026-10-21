import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Views
import { DesignSystem } from './design-system';

// Constants
import { PATH } from './constants';

const Home = React.lazy(async () => {
  const { Home } = await import('./home');

  return { default: Home };
});

// No layout of its own: the docs remote lays out its pages itself.
const Workshop = (
  <Route path={PATH}>
    <Route
      index
      element={
        <Suspense fallback={<Spinner />}>
          <Home />
        </Suspense>
      }
    />
    {DesignSystem}
  </Route>
);

export { PATH, Workshop };
