import React from 'react';

// Library
import classNames from 'classnames';

// Icons
import { Ri } from '@/icons';

// Components
import { Heading, HyperLink, Text } from '@/components';

// Styles
import './styles.scss';

// Constants
import {
  COPY as EXPERIMENTS_COPY,
  toPath as toExperimentsPath,
} from '@/views/experiments/constants';
import { PATH } from '@/views/experiments/tree-of-life/constants';
import { CLASS_NAME as BANNER } from '@/views/experiments/tree-of-life/home/banner/constants';
import { toVersionPath } from '@/views/experiments/tree-of-life/versions/constants';
import { VERSION } from '@/views/experiments/tree-of-life/versions/v15/constants';

const CLASS_NAME = `${BANNER}__intro`;

const COPY = {
  cta: 'See the experience',
  lede: 'Start at the origin of life and walk to any species alive now. There are about 2.3 million to choose from, and every organism you pass has an illustration drawn for it.',
  title: 'Tree of Life',
};

const Intro: React.FunctionComponent = () => (
  <div className={classNames('kicl-position-relative')}>
    <HyperLink
      before={<Ri.RiArrowLeftSFill aria-hidden />}
      to={toExperimentsPath(PATH)}
    >
      {EXPERIMENTS_COPY.back}
    </HyperLink>
    <Heading
      is='h1'
      dense
      className={classNames(`${CLASS_NAME}__title`, 'kicl-font-size-huge')}
    >
      {COPY.title}
    </Heading>
    <Text is='p' className={classNames('kicl-font-size-medium')}>
      {COPY.lede}
    </Text>
    <HyperLink
      className={classNames('kicl-background-color-confirm')}
      lookLikeButton
      to={toVersionPath({ version: VERSION })}
      size='small'
    >
      {COPY.cta}
    </HyperLink>
  </div>
);

export { CLASS_NAME, Intro };
