import React, { Suspense } from 'react';

// Routes
import { Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() => import('./Contents'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

export { PATH };
export default <Route path={`${PATH}/*`} element={<Lazy />} />;
