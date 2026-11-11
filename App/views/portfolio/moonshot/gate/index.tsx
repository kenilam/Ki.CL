import React, { Suspense } from 'react';

// Components
import { Spinner } from 'design/components';

const Contents = React.lazy(async () => {
  const { Contents } = await import('./contents');

  return { default: Contents };
});

/**
 * Credential gate for the piece: its child routes need a sign-in by a user
 * with access to it.
 */
const Gate: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

export { Gate };
