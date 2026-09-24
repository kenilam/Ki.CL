import React, { Suspense } from 'react';

// Routes
import { Route as Origin } from '@/router';

// Components
import { Spinner } from '@/components';

// Views
import { ImageAgent } from './image-agent';
import { MusicVisualiser } from './music-visualiser';
import { TreeOfLife } from './tree-of-life';

// Constants
import { PATH } from './constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ Experiments }) => ({ default: Experiments }))
);
const Home = React.lazy(() =>
  import('./home').then(({ Home }) => ({ default: Home }))
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
    {ImageAgent}
  </Origin>
);

export { PATH, Experiments };
