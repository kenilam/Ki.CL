import React, { Suspense } from 'react';

// Components
import { Spinner } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';

// Styles
import '@/views/experiments/tree-of-life/styles.scss';
import './styles.scss';

const VERSIONS = {
  true: React.lazy(async () => {
    const { Normal } = await import('./normal');

    return { default: Normal };
  }),
  false: React.lazy(async () => {
    const { Default } = await import('./default');

    return { default: Default };
  }),
};

/** The banner's picture, drawn the same on its own page and on the experiments home. */
const Plate: React.FunctionComponent = () => {
  const { isNormal } = useResponsive();

  const Version = VERSIONS[String(isNormal)];

  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Version />
    </Suspense>
  );
};

export { Plate };
