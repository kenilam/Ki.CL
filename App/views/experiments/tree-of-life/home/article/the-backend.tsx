import React from 'react';

// Components
import { Details, Markdown, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const TheBackend: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  return (
    <Details heading='h3' summary={t('title', { context: 'the_backend' })}>
      <Text is='p'>{t('article.the_backend.p1')}</Text>
      <Text is='p'>
        <Markdown>{t('article.the_backend.p2')}</Markdown>
      </Text>
      <Text is='p'>{t('article.the_backend.p3')}</Text>
    </Details>
  );
};

export { TheBackend };
