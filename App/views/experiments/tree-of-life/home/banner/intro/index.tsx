import React from 'react';

// Components
import { BackLink, Heading, HyperLink, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { toPath as toExperimentsPath } from '@/views/experiments/constants';
import {
  PATH,
  ROOT_NODE_ID,
  toPath,
} from '@/views/experiments/tree-of-life/constants';
import { TITLE_CLASS_NAME } from '@/views/experiments/tree-of-life/title';

const Intro: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    treeOfLife: useTranslation('tree-of-life'),
  };

  return (
    <>
      <BackLink
        label={translations.common.t('experiments')}
        to={toExperimentsPath(PATH)}
      />
      <Heading className={TITLE_CLASS_NAME} dense is='h1' lookLike='display'>
        {translations.common.t('experiment', { context: 'tree_of_life' })}
      </Heading>
      <Text className='kicl-max-inline-size-columns-8' is='p'>
        {translations.treeOfLife.t('lede')}
      </Text>
      <HyperLink
        className='kicl-margin-block-start-narrow'
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

export { Intro };
