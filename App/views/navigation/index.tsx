import React, { Suspense } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

// Components
import { Spinner } from 'design/components';

const VERSIONS = {
  true: React.lazy(async () => {
    const { Mobile } = await import('./mobile');

    return { default: Mobile };
  }),
  false: React.lazy(async () => {
    const { Default } = await import('./default');

    return { default: Default };
  }),
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
