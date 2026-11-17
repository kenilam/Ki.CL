import React, { Suspense, useDeferredValue } from 'react';

import classNames from 'classnames';

import { Layout, Spinner } from 'design/components';
import { useResponsive } from 'design/hooks';

import { useMoment } from '@/views/use-moment';

import { OPENING } from '@/views/constants';
import { NAME_ID } from './constants';

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

  const width = useDeferredValue(isNarrow ? 'narrow' : WIDTHS[String(isWider)]);

  const Version = VERSIONS[width];

  return (
    <Layout autoFlow='row'>
      <header
        aria-labelledby={NAME_ID}
        className={classNames(
          'kicl-min-block-size-screen',
          'kicl-padding-block-end-wide',
          'kicl-padding-block-start-header',
          'kicl-padding-inline-frame-columns-12',
          'kicl-scroll-leave',
          'kicl-scroll-snap-align-start'
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
