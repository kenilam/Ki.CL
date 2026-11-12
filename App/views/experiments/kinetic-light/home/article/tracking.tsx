import React from 'react';

// Components
import { Details, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Tracking: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Details heading='h3' summary={t('article.tracking.title')}>
      <Text is='p'>{t('article.tracking.session')}</Text>
      <Text is='p'>{t('article.tracking.allowance')}</Text>
    </Details>
  );
};

export { Tracking };
