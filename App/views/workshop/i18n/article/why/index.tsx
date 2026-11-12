import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Needs } from './needs';

const Why: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details heading='h2' open summary={t('article.why.title')}>
      <Text is='p'>{t('article.why.rule')}</Text>
      <Text is='p'>{t('article.why.intro')}</Text>
      <Needs />
    </Details>
  );
};

export { Why };
