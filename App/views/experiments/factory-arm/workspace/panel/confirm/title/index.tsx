import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');

  return (
    <Heading dense is='h2' lookLike='h4'>
      {t('start_over', { context: 'title' })}
    </Heading>
  );
};

export { Title };
