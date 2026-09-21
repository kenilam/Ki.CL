import React, { Suspense } from 'react';

// Routes
import { Route } from '@/Router';

// Components
import { Spinner } from '@/Components';

// Constants
import { PLAY_PATTERN } from '@/Views/Experiments/MusicVisualiser/constants';

const Contents = React.lazy(() => import('./Contents'));

const Lazy: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Contents />
    </Suspense>
  );
};

/** `/play` - the track sounds; see `Contents`. */
export default <Route path={PLAY_PATTERN} element={<Lazy />} />;
