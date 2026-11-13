import React from 'react';

// Components
import { Details } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Links } from './links';

const References: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.references.title')}>
      <Links />
    </Details>
  );
};

export { References };
