import React from 'react';

// Library
import classNames from 'classnames';

// Components
import { BackLink, Heading, HyperLink, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

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
  const translations = {
    common: useTranslation(),
    treeOfLife: useTranslation('tree-of-life'),
  };

  return (
    <>
      <BackLink
        className='kicl-margin-block-end'
        label={translations.common.t('experiments')}
        to={toExperimentsPath(PATH)}
      />
      <Heading
        is='h1'
        dense
        className={classNames(
          `${CLASS_NAME}__title`,
          'kicl-animation-none-reduced-motion',
          'kicl-font-size-huge'
        )}
      >
        {translations.common.t('experiment', { context: 'tree_of_life' })}
      </Heading>
      <Text className='kicl-margin-block-start-wide' is='p'>
        {translations.treeOfLife.t('lede')}
      </Text>
      <HyperLink
        className='kicl-margin-block-start-wide'
        level='confirm'
        lookLikeButton
        to={toPath(ROOT_NODE_ID)}
        size='small'
      >
        {translations.common.t('action', { context: 'see_experience' })}
      </HyperLink>
    </>
  );
};

export { CLASS_NAME, Intro };
