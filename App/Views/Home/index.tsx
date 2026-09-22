import React, { Suspense } from 'react';

// Routes
import { Route as Origin } from '@/Router';

// Components
import { Spinner } from '@/Components';

const PATH = '';

const Contents = React.lazy(() =>
  import('./Contents').then(({ Home }) => ({ default: Home }))
);

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

const Home = <Origin path={PATH} element={<Lazy />} />;

export { PATH, Home };
