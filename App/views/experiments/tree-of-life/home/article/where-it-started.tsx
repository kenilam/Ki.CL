import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const WhereItStarted: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  return (
    <Details
      heading='h3'
      open
      summary={t('title', { context: 'where_it_started' })}
    >
      <Text is='p'>
        <Markdown>{t('article.where_it_started.p1')}</Markdown>
      </Text>
      <Text is='p'>{t('article.where_it_started.p2')}</Text>
    </Details>
  );
};

export { WhereItStarted };
