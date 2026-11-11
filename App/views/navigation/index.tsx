import React, { Suspense } from 'react';

// Hooks
import { useResponsive } from 'design/hooks';

// Components
import { Spinner } from 'design/components';

const VERSIONS = {
  true: React.lazy(async () => {
    const { Narrow } = await import('./narrow');

    return { default: Narrow };
  }),
  false: React.lazy(async () => {
    const { Default } = await import('./default');

    return { default: Default };
  }),
};

const Navigation: React.FunctionComponent = () => {
  const { isNarrow } = useResponsive();

  const Version = VERSIONS[String(isNarrow)];

  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Version />
    </Suspense>
  );
};

export { Navigation };
