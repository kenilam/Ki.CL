import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PARAM, PATH } from './constants';

const Contents = React.lazy(async () => {
  const { Daylight } = await import('./contents');

  return { default: Daylight };
});

const Lazy: React.FunctionComponent = () => (
  <Suspense fallback={<Spinner />}>
    <Contents />
  </Suspense>
);

/**
 * `/experiments/daylight/:place`. The place in the address is the one the
 * globe faces, so a link to it opens the same view. The bare path goes to
 * the place nearest the visitor.
 */
const Daylight = (
  <Route path={PATH}>
    <Route index element={<Lazy />} />
    <Route path={`:${PARAM}`} element={<Lazy />} />
  </Route>
);

export { PATH, Daylight };
