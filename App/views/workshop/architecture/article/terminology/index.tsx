import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Terms } from './terms';

const Terminology: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.terms.title')}>
      <Text is='p'>{t('article.terms.intro')}</Text>
      <Terms />
    </Details>
  );
};

export { Terminology };
