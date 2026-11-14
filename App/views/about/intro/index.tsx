import React, { Suspense } from 'react';

import classNames from 'classnames';

import { Layout, Spinner } from 'design/components';
import { useResponsive } from 'design/hooks';

import { useMoment } from '@/views/about/use-moment';

import { OPENING } from '@/views/about/constants';
import { TITLE_ID } from './constants';

const VERSIONS = {
  default: React.lazy(async () => {
    const { Default } = await import('./default');

    return { default: Default };
  }),
  narrow: React.lazy(async () => {
    const { Narrow } = await import('./narrow');

    return { default: Narrow };
  }),
  wider: React.lazy(async () => {
    const { Wider } = await import('./wider');

    return { default: Wider };
  }),
};

const WIDTHS = {
  true: 'wider',
  false: 'default',
} as const;

const Intro: React.FunctionComponent = () => {
  const { isNarrow, isWider } = useResponsive();
  const ref = useMoment<HTMLElement>(OPENING);

  const Version = VERSIONS[isNarrow ? 'narrow' : WIDTHS[String(isWider)]];

  return (
    <Layout autoFlow='row'>
      <section
        aria-labelledby={TITLE_ID}
        className={classNames(
          'kicl-min-block-size-screen',
          'kicl-padding-block-end-wide',
          'kicl-padding-block-start-header',
          'kicl-scroll-leave',
          'kicl-scroll-snap-align-start'
        )}
        ref={ref}
      >
        <Suspense fallback={<Spinner position='inline' />}>
          <Version />
        </Suspense>
      </section>
    </Layout>
  );
};

export { Intro };
