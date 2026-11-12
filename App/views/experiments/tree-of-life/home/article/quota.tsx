import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Quota: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');

  return (
    <Details heading='h3' summary={t('title', { context: 'quota' })}>
      <Text is='p'>{t('article.quota.p1')}</Text>
      <Text is='p'>{t('article.quota.p2')}</Text>
      <Text is='p'>{t('article.quota.p3')}</Text>
    </Details>
  );
};

export { Quota };
