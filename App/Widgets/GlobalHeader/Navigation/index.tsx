import React, { Suspense } from 'react';

// Hooks
import { useResponsive } from '@/Hooks';

// Components
import { Spinner } from '@/Components';

const VERSIONS = {
  true: React.lazy(() => import('./Mobile')),
  false: React.lazy(() => import('./Default')),
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

export default Navigation;
