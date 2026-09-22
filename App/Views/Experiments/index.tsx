import React, { Suspense } from 'react';

// Routes
import { Route as Origin } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Views
import { MusicVisualiser } from './MusicVisualiser';
import { TreeOfLife } from './TreeOfLife';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./Contents').then(({ Experiments }) => ({ default: Experiments }))
);
const Home = React.lazy(() =>
  import('./Home').then(({ Home }) => ({ default: Home }))
);

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

const Experiments = (
  <Origin path={PATH} element={<Lazy />}>
    <Origin
      index
      element={
        <Suspense fallback={<Spinner />}>
          <Home />
        </Suspense>
      }
    />
    {TreeOfLife}
    {MusicVisualiser}
  </Origin>
);

export { PATH, Experiments };
