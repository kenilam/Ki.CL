import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Heading dense is='h2' lookLike='h4'>
      {t('send_message')}
    </Heading>
  );
};

export { Title };
