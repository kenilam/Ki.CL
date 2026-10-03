import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ FactoryArm }) => ({ default: FactoryArm }))
);

const Lazy: React.FunctionComponent = () => (
  <Suspense fallback={<Spinner position='inline' />}>
    <Contents />
  </Suspense>
);

/** `/experiments/factory-arm`: one page, the arm on its table. */
const FactoryArm = <Route path={PATH} element={<Lazy />} />;

export { PATH, FactoryArm };
