import React, { Suspense, useDeferredValue } from 'react';

import classNames from 'classnames';

import { Spinner } from 'design/components';
import { useResponsive } from 'design/hooks';

import { useMoment } from '@/views/about/use-moment';

import { MOMENTS } from '@/views/about/resume/constants';

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

const Earlier: React.FunctionComponent = () => {
  const { isNarrow } = useResponsive();
  const ref = useMoment<HTMLElement>(MOMENTS.earlier);
  const narrow = useDeferredValue(String(isNarrow));

  const Version = VERSIONS[narrow];

  return (
    <section
      className={classNames(
        'kicl-max-inline-size-columns-8',
        'kicl-padding-block-wider',
        'kicl-scroll-focus-within',
        'kicl-scroll-focus-scale',
        'kicl-scroll-snap-align-center'
      )}
      ref={ref}
    >
      <Suspense fallback={<Spinner position='inline' />}>
        <Version />
      </Suspense>
    </section>
  );
};

export { Earlier };
