import React, { Suspense } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

// Components
import { Spinner } from 'design/components';

// Views
import { SignOut } from '@/views/account/sign-out';
import { useAccount } from '@/views/account/use-account';

const VERSIONS = {
  true: React.lazy(() =>
    import('./mobile').then(({ Mobile }) => ({ default: Mobile }))
  ),
  false: React.lazy(() =>
    import('./default').then(({ Default }) => ({ default: Default }))
  ),
};

const Navigation: React.FunctionComponent = () => {
  const { isMobile } = useResponsive();

  const { me } = useAccount();

  const Version = VERSIONS[String(isMobile)];

  return (
    <>
      <Suspense fallback={<Spinner position='inline' />}>
        <Version />
      </Suspense>

      {/* Outside both menus, so it can open while they are closed. */}
      {me ? <SignOut /> : null}
    </>
  );
};

export { Navigation };
