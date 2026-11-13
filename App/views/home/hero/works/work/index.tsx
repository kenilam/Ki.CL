import React, { Suspense } from 'react';

import { Animation, ListItem, Spinner } from 'design/components';
import { useResponsive } from 'design/hooks';

import { WORKS } from '@/views/home/hero/works/constants';

import './styles.scss';

import { CLASS_NAME } from './constants';

type Props = { plate: (typeof WORKS)[number] };

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

const Work: React.FunctionComponent<Props> = ({ plate }) => {
  const { isNarrow } = useResponsive();

  const Version = VERSIONS[String(isNarrow)];

  const index = WORKS.indexOf(plate);

  return (
    <Animation delay={1600 + 400 * (index + 1)} property='slide-from-bottom'>
      <ListItem className={CLASS_NAME}>
        <Suspense fallback={<Spinner position='inline' />}>
          <Version plate={plate} />
        </Suspense>
      </ListItem>
    </Animation>
  );
};

export { Work, type Props };
