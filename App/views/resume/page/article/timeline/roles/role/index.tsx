import React, { Suspense, useDeferredValue } from 'react';

import classNames from 'classnames';

import { ListItem, Spinner } from 'design/components';
import { useResponsive } from 'design/hooks';

import { useMoment } from '@/views/use-moment';
import { useSnap } from '@/views/use-snap';

import type { Resolved } from '@/views/resume/content';

import { MOMENTS } from '@/views/resume/constants';

type Props = Pick<Resolved['experience'][number], 'id'>;

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

const Role: React.FunctionComponent<Props> = ({ id }) => {
  const { isNarrow } = useResponsive();
  const ref = useMoment<HTMLLIElement>(MOMENTS[id]);
  const snap = useSnap(ref);

  const narrow = useDeferredValue(String(isNarrow));

  const Version = VERSIONS[narrow];

  return (
    <ListItem
      className={classNames(
        'kicl-padding-block-wider',
        'kicl-padding-block-end-screen-quarter',
        'kicl-scroll-focus-within',
        'kicl-scroll-focus-scale',
        snap
      )}
      alignItems='start'
      justifyContent='start'
      ref={ref}
    >
      <Suspense fallback={<Spinner position='inline' />}>
        <Version id={id} />
      </Suspense>
    </ListItem>
  );
};

export { Role, type Props };
