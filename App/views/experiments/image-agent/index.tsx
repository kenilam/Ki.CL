import React, { Suspense } from 'react';

// Routes
import { Route } from 'design/router';

// Components
import { Spinner } from 'design/components';

// Constants
import { PATH, THREAD_PATTERN } from './constants';

const Contents = React.lazy(async () => {
  const { ImageAgent } = await import('./contents');

  return { default: ImageAgent };
});
const Start = React.lazy(async () => {
  const { Start } = await import('./start');

  return { default: Start };
});
const Chat = React.lazy(async () => {
  const { Chat } = await import('./chat');

  return { default: Chat };
});

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
