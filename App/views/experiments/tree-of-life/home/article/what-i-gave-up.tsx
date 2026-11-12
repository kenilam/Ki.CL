import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import {
  ROOT_NODE_ID,
  toPath,
} from '@/views/experiments/tree-of-life/constants';

const WhatIGaveUp: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  const links = { current: toPath(ROOT_NODE_ID) };

  return (
    <Details heading='h3' summary={t('title', { context: 'what_i_gave_up' })}>
      <Text is='p'>{t('article.what_i_gave_up.one_taxon')}</Text>
      <Text is='p'>{t('article.what_i_gave_up.p2')}</Text>
      <Text is='p'>
        <Markdown>{t('article.what_i_gave_up.p3', links)}</Markdown>
      </Text>
    </Details>
  );
};

export { WhatIGaveUp };
