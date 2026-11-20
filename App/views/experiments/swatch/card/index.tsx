import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PARAM } from '@/views/experiments/swatch/constants';

const Contents = React.lazy(async () => {
  const { Contents } = await import('./contents');

  return { default: Contents };
});

const Card = (
  <Route
    path={`:${PARAM}`}
    element={
      <Suspense fallback={<Spinner position='inline' />}>
        <Contents />
      </Suspense>
    }
  />
);

export { Card };
