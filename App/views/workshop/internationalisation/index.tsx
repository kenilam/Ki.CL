import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(async () => {
  const { Contents } = await import('./contents');

  return { default: Contents };
});

const Internationalisation = (
  <Route
    path={PATH}
    element={
      <Suspense fallback={<Spinner />}>
        <Contents />
      </Suspense>
    }
  />
);

export { PATH, Internationalisation };
