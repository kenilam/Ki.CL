import React, { Suspense } from 'react';

import classNames from 'classnames';

import { Spinner } from 'design/components';
import { useResponsive } from 'design/hooks';

import { CLASS_NAME, TITLE_ID } from './constants';

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

const Hero: React.FunctionComponent = () => {
  const { isNarrow } = useResponsive();

  const Version = VERSIONS[String(isNarrow)];

  return (
    <section
      aria-labelledby={TITLE_ID}
      className={classNames(
        CLASS_NAME,
        'kicl-inline-size-full',
        'kicl-padding-block-end-extreme',
        'kicl-padding-inline-frame-columns-12',
        'kicl-position-relative'
      )}
    >
      <Suspense fallback={<Spinner position='inline' />}>
        <Version />
      </Suspense>
    </section>
  );
};

export { Hero };
