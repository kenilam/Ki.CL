import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PATH } from './constants';

const Docs = React.lazy(async () => {
  const { Docs } = await import('design/docs');

  return { default: Docs };
});

// The docs route themselves, relative to wherever they are mounted.
const DesignSystem = (
  <Route
    path={`${PATH}/*`}
    element={
      <Suspense fallback={<Spinner />}>
        <Docs />
      </Suspense>
    }
  />
);

export { PATH, DesignSystem };
