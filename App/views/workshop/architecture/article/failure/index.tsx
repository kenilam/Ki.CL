import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Orders } from './orders';

const Failure: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.failure.title')}>
      <Text is='p'>{t('article.failure.required')}</Text>
      <Text is='p'>{t('article.failure.optional')}</Text>
      <Text is='p'>{t('article.failure.release')}</Text>
      <Orders />
      <Text is='p'>{t('article.failure.public')}</Text>
    </Details>
  );
};

export { Failure };
