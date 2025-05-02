import React, { Suspense } from 'react';

// Routes
import { Route as Origin } from '@/Router';

// Components
import { Spinner } from '@/Components';

const PATH = '';

const Contents = React.lazy(() => import('./Contents'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner className='kicl--views--full-screen' />}>
      <Contents />
    </Suspense>
  );
};

export { PATH };
export default <Origin path={PATH} element={<Lazy />} />;
