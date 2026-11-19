import React, { Suspense } from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout, Spinner } from 'design/components';

// Hooks
import { useResponsive } from 'design/hooks';
import { useSection } from '@/views/blog/spatial-css/use-section';

// Constants
import { TITLE_ID } from '@/views/blog/spatial-css/constants';

const VERSIONS = {
  false: React.lazy(async () => {
    const { Default } = await import('./default');

    return { default: Default };
  }),
  true: React.lazy(async () => {
    const { Narrow } = await import('./narrow');

    return { default: Narrow };
  }),
};

const Intro: React.FunctionComponent = () => {
  const { isNarrow } = useResponsive();
  const ref = useSection<HTMLElement>('intro');

  const Version = VERSIONS[String(isNarrow) as 'false' | 'true'];

  return (
    <Layout autoFlow='row'>
      <header
        aria-labelledby={TITLE_ID}
        className={classNames(
          'kicl-min-block-size-screen',
          'kicl-padding-block-end-wide',
          'kicl-padding-block-start-header',
          'kicl-scroll-leave'
        )}
        ref={ref}
      >
        <Suspense fallback={<Spinner position='inline' />}>
          <Version />
        </Suspense>
      </header>
    </Layout>
  );
};

export { Intro };
