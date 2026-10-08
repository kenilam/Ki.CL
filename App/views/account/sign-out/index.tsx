import React, { Suspense } from 'react';

// Views
import { useAccount } from '@/views/account/use-account';

const Dialog = React.lazy(async () => {
  const { SignOut } = await import('./sign-out');

  return { default: SignOut };
});

/** The sign-out dialog, loaded only once someone is signed in. */
const SignOut: React.FunctionComponent = () => {
  const { me } = useAccount();

  if (!me) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Dialog />
    </Suspense>
  );
};

export { SignOut };
