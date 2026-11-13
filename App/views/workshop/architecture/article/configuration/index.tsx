import React from 'react';

// Components
import { Details } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Api } from './api';
import { Design } from './design';
import { Host } from './host';

const Configuration: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.config.title')}>
      <Host />
      <Design />
      <Api />
    </Details>
  );
};

export { Configuration };
