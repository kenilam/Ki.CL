import React, { Suspense } from 'react';

// Components
import { Spinner } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';

// Styles
import '@/views/experiments/tree-of-life/styles.scss';
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

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

const Banner: React.FunctionComponent = () => {
  const { isNormal } = useResponsive();

  const Version = VERSIONS[String(isNormal)];

  return (
    <Suspense fallback={<Spinner position='inline' />}>
      <Version />
    </Suspense>
  );
};

export { CLASS_NAME, Banner };
