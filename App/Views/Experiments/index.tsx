import React, { Suspense } from 'react';

// Routes
import { Navigate, Route as Origin } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Views
import MusicVisualiser from './MusicVisualiser';
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
    <Origin index element={<Navigate to='tree-of-life' replace />} />
    {TreeOfLife}
    {MusicVisualiser}
  </Origin>
);
