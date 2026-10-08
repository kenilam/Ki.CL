import React, { Suspense } from 'react';

// Routes
import { Route as Origin } from 'design/router';

// Components
import { Spinner } from 'design/components';

const PATH = '';

const Contents = React.lazy(async () => {
  const { Home } = await import('./contents');

  return { default: Home };
});

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

const Home = <Origin path={PATH} element={<Lazy />} />;

export { PATH, Home };
