import React, { Suspense } from 'react';

// Routes
import { Route } from '@/router';

// Components
import { Spinner } from '@/components';

// Constants
import { PATH, THREAD_PATTERN } from './constants';

const Contents = React.lazy(() =>
  import('./contents').then(({ ImageAgent }) => ({ default: ImageAgent }))
);
const Start = React.lazy(() =>
  import('./start').then(({ Start }) => ({ default: Start }))
);
const Chat = React.lazy(() =>
  import('./chat').then(({ Chat }) => ({ default: Chat }))
);

const lazy = (element: React.ReactNode) => (
  <Suspense fallback={<Spinner position='inline' />}>{element}</Suspense>
);

/** `/experiments/image-agent` starts a conversation; `/:threadId` shows one. */
const ImageAgent = (
  <Route path={PATH} element={lazy(<Contents />)}>
    <Route index element={lazy(<Start />)} />
    <Route path={THREAD_PATTERN} element={lazy(<Chat />)} />
  </Route>
);

export { PATH, ImageAgent };
