import React from 'react';

import classNames from 'classnames';

import { useResponsive } from 'design/hooks';

import { Headline } from './headline';
import { Name } from './name';

import './styles.scss';

import { CLASS_NAME as INTRO } from '@/views/resume/page/article/intro/constants';

const COLUMNS = {
  true: 'kicl-grid-column-1',
  false: 'kicl-grid-column-2',
};

const Title: React.FunctionComponent = () => {
  const { isWider } = useResponsive();

  return (
    <hgroup
      className={classNames(
        `${INTRO}__title`,
        COLUMNS[String(isWider)],
        'kicl-align-self-center',
        'kicl-scroll-leave-far'
      )}
    >
      <Name />
      <Headline />
    </hgroup>
  );
};

export { Title };
