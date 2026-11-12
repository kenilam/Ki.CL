import React from 'react';

// Components
import { Details } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Paragraphs } from './paragraphs';

const Serving: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details heading='h2' summary={t('article.serving.title')}>
      <Paragraphs />
    </Details>
  );
};

export { Serving };
