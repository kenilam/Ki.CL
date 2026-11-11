import React, { Suspense } from 'react';

// Views
import { useAccount } from '@/views/account/use-account';

// Context
import { Provider } from './context';

const Dialog = React.lazy(async () => {
  const { Dialog } = await import('./dialog');

  return { default: Dialog };
});

/** The sign-out dialog, loaded only once someone is signed in. */
const SignOut: React.FunctionComponent = () => {
  const { me } = useAccount();

  if (!me) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <Provider>
        <Dialog />
      </Provider>
    </Suspense>
  );
};

export { SignOut };
