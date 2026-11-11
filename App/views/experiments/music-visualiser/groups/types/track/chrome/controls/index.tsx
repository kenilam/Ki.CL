import React, { Suspense } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, Spinner } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__chrome__controls`;

const VERSIONS = {
  true: React.lazy(async () => {
    const { Narrowest } = await import('./narrowest');

    return { default: Narrowest };
  }),
  false: React.lazy(async () => {
    const { Default } = await import('./default');

    return { default: Default };
  }),
};

const Controls: React.FunctionComponent = () => {
  const { isNarrowest } = useResponsive();

  const Version = VERSIONS[String(isNarrowest)];

  return (
    // Fades as one while the listener is still.
    <Layout autoFlow='row' gap='narrow'>
      <div className={classNames(CLASS_NAME, 'kicl-transition-duration-slow')}>
        <Suspense fallback={<Spinner position='inline' />}>
          <Version />
        </Suspense>
      </div>
    </Layout>
  );
};

export { Controls };
