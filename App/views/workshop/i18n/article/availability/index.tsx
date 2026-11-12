import React from 'react';

// Components
import { Details } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Paragraphs } from './paragraphs';
import { Release } from './release';

const Availability: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details heading='h2' summary={t('article.availability.title')}>
      <Paragraphs />
      <Release />
    </Details>
  );
};

export { Availability };
