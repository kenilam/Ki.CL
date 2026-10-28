import React from 'react';

// Library
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Icons
import * as Ri from 'react-icons/ri';

// Components
import { Heading, HyperLink, Text } from 'design/components';

// Styles
import './styles.scss';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import {
  PATH,
  ROOT_NODE_ID,
  toPath,
} from '@/views/experiments/tree-of-life/constants';
import { CLASS_NAME as BANNER } from '@/views/experiments/tree-of-life/home/banner/constants';

const CLASS_NAME = `${BANNER}__intro`;

const Intro: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { t: common } = useTranslation();

  return (
    <>
      <HyperLink
        before={<Ri.RiArrowLeftSFill aria-hidden />}
        to={toExperimentsPath(PATH)}
      >
        {common('experiments')}
      </HyperLink>
      <Heading
        is='h1'
        dense
        className={classNames(
          `${CLASS_NAME}__title`,
          'kicl-animation-none-reduced-motion',
          'kicl-font-size-huge'
        )}
      >
        {common('experiment', { context: 'tree_of_life' })}
      </Heading>
      <Text is='p'>{t('lede')}</Text>
      <HyperLink
        level='confirm'
        lookLikeButton
        to={toPath(ROOT_NODE_ID)}
        size='small'
      >
        {common('action', { context: 'see_experience' })}
      </HyperLink>
    </>
  );
};

export { CLASS_NAME, Intro };
