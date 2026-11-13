import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Teams } from './teams';

const Worth: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.worth.title')}>
      <Text is='p'>{t('article.worth.problem')}</Text>
      <Text is='p'>{t('article.worth.this_site')}</Text>
      <Text is='p'>{t('article.worth.reason')}</Text>
      <Teams />
      <Text is='p'>{t('article.worth.size')}</Text>
      <Text is='p'>{t('article.worth.keep')}</Text>
    </Details>
  );
};

export { Worth };
