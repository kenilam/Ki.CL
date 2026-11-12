import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Figure } from './figure';

// Constants
import {
  ROOT_NODE_ID,
  toPath,
} from '@/views/experiments/tree-of-life/constants';
import { V14 } from './constants';

const FifteenAttempts: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  // Every link in the copy, by the name the strings use for it.
  const links = { current: toPath(ROOT_NODE_ID) };

  return (
    <Details heading='h3' summary={t('title', { context: 'fifteen_attempts' })}>
      <Text is='p'>{t('article.fifteen_attempts.webgl')}</Text>
      <Text is='p'>{t('article.fifteen_attempts.html')}</Text>
      <Figure
        data={V14}
        alt={t('article.fifteen_attempts.alt')}
        caption={t('article.fifteen_attempts.caption_map')}
      />
      <Text is='p'>
        <Markdown>{t('article.fifteen_attempts.widest', links)}</Markdown>
      </Text>
    </Details>
  );
};

export { FifteenAttempts };
