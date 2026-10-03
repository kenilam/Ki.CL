import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ SystemDesign }) => ({ default: SystemDesign }))
);

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

const SystemDesign = <Route path={`${PATH}/*`} element={<Lazy />} />;

export { PATH, SystemDesign };
