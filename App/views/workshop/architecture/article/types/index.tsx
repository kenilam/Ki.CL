import React from 'react';

// Components
import { Details } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Paragraphs } from './paragraphs';

const Types: React.FunctionComponent = () => {
  const { t } = useTranslation('architecture');

  return (
    <Details heading='h2' summary={t('article.types.title')}>
      <Paragraphs />
    </Details>
  );
};

export { Types };
