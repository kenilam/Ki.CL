import React, { Suspense } from 'react';

// Hooks
import { useResponsive } from '@/hooks';

// Components
import { Spinner } from '@/components';

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

  const Version = VERSIONS[String(isMobile)];

  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Version />
    </Suspense>
  );
};

export { Navigation };
