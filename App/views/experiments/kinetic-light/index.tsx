import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Views
import { Home } from './home';
import { Song } from './song';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(async () => {
  const { Contents } = await import('./contents');

  return { default: Contents };
});

const KineticLight = (
  <Route
    path={PATH}
    element={
      <Suspense fallback={<Spinner position='inline' />}>
        <Contents />
      </Suspense>
    }
  >
    {Home}
    {Song}
  </Route>
);

export { PATH, KineticLight };
