import React from 'react';

import classNames from 'classnames';

import { List } from 'design/components';
import { useTranslation } from 'design/hooks';

import { Chapter } from './chapter';

import { CHAPTERS } from '@/views/about/constants';

const Chapters: React.FunctionComponent = () => {
  const { t } = useTranslation('about');

  return (
    <List
      aria-label={t('timeline')}
      className={classNames(
        'kicl-max-inline-size-columns-8',
        'kicl-padding-block-end-screen-quarter',
        'kicl-scroll-snap-page'
      )}
      gap='none'
      is='ol'
    >
      {CHAPTERS.map((id) => {
        return <Chapter id={id} key={id} />;
      })}
    </List>
  );
};

export { Chapters };
