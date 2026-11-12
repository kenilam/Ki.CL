import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Kinds } from './kinds';

const Keeping: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Details heading='h3' summary={t('title', { context: 'privacy' })}>
      <Text is='p'>{t('article.keeping.intro')}</Text>
      <Kinds />
      <Text is='p'>{t('article.keeping.days')}</Text>
    </Details>
  );
};

export { Keeping };
