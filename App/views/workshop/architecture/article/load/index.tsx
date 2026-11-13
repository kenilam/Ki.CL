import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Overview } from './overview';
import { Steps } from './steps';

const Load: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.load.title')}>
      <Overview />
      <Text is='p'>{t('article.load.intro')}</Text>
      <Steps />
    </Details>
  );
};

export { Load };
