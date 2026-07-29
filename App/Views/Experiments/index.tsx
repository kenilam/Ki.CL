import React, { Suspense } from 'react';

// Routes
import { Route as Origin } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Views
import TreeOfLife from './TreeOfLife';

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
export default (
  <Origin path={PATH} element={<Lazy />}>
    {TreeOfLife}
  </Origin>
);
