import React, { Suspense } from 'react';

// Hooks
import { useResponsive } from '@/Hooks';

// Components
import { Spinner } from '@/Components';

const VERSIONS = {
  true: React.lazy(() =>
    import('./Mobile').then(({ Mobile }) => ({ default: Mobile }))
  ),
  false: React.lazy(() =>
    import('./Default').then(({ Default }) => ({ default: Default }))
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
