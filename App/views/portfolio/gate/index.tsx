import React, { Suspense } from 'react';

// Components
import { Spinner } from 'design/components';

const Contents = React.lazy(() =>
  import('./contents').then(({ Contents }) => ({ default: Contents }))
);

/** Credential gate for the portfolio pieces: its child routes need a sign-in. */
const Gate: React.FunctionComponent = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents />
    </Suspense>
  );
};

export { Gate };
