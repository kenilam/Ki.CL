import React, { Suspense } from 'react';

import classNames from 'classnames';

import { ListItem, Spinner } from 'design/components';
import { useResponsive } from 'design/hooks';

import { useMoment } from '@/views/about/use-moment';

import type { Chapter as Id } from '@/views/about/constants';

type Props = { id: Id };

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

const Chapter: React.FunctionComponent<Props> = ({ id }) => {
  const { isNarrow } = useResponsive();
  const ref = useMoment<HTMLLIElement>(id);

  const Version = VERSIONS[String(isNarrow)];

  return (
    <ListItem
      className={classNames(
        'kicl-padding-block-wider',
        'kicl-scroll-focus',
        'kicl-scroll-focus-scale',
        'kicl-scroll-snap-align-center'
      )}
      ref={ref}
    >
      <Suspense fallback={<Spinner position='inline' />}>
        <Version id={id} />
      </Suspense>
    </ListItem>
  );
};

export { Chapter, type Props };
