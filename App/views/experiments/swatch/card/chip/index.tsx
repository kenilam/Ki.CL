import React, { Suspense } from 'react';

// Components
import { Spinner } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';

// Styles
import './styles.scss';

const VERSIONS = {
  true: React.lazy(async () => {
    const { Narrower } = await import('./narrower');

    return { default: Narrower };
  }),
  false: React.lazy(async () => {
    const { Default } = await import('./default');

    return { default: Default };
  }),
};

const Chip: React.FunctionComponent = () => {
  const { isNarrower } = useResponsive();

  const Version = VERSIONS[String(isNarrower)];

  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Version />
    </Suspense>
  );
};

export { Chip };
