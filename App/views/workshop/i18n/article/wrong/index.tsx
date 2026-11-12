import React from 'react';

// Components
import { Details } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Stories } from './stories';

const Wrong: React.FunctionComponent = () => {
  const { t } = useTranslation('internationalisation');

  return (
    <Details heading='h2' summary={t('article.wrong.title')}>
      <Stories />
    </Details>
  );
};

export { Wrong };
