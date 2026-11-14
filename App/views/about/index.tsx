import React, { Suspense } from 'react';

import { Route } from 'design/router';

import { Spinner } from 'design/components';

import { Resume } from './resume';

import { PATH } from './constants';

const Contents = React.lazy(async () => {
  const { About } = await import('./contents');

  return { default: About };
});

const About = (
  <Route path={PATH}>
    <Route
      index
      element={
        <Suspense fallback={<Spinner />}>
          <Contents />
        </Suspense>
      }
    />
    {Resume}
  </Route>
);

export { About, PATH };
