import React, { Suspense } from 'react';

// Components
import { Spinner } from 'design/components';

const Contents = React.lazy(() =>
  import('./contents').then(({ Contents }) => ({ default: Contents }))
);

type GateProps = React.ComponentProps<typeof Contents>;

/**
 * Credential gate for a portfolio piece: its child routes need a sign-in by a
 * user with access to the piece at `path`.
 */
const Gate: React.FunctionComponent<GateProps> = (props) => {
  return (
    <Suspense fallback={<Spinner />}>
      <Contents {...props} />
    </Suspense>
  );
};

export { Gate };
