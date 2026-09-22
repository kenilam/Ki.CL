import React, { Suspense } from 'react';

// Routes
import { Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./Contents').then(({ SystemDesign }) => ({ default: SystemDesign }))
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
