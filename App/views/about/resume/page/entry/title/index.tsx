import React from 'react';

import { Heading } from 'design/components';
import { useTranslation } from 'design/hooks';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Heading dense is='h2' lookLike='h4'>
      {t('resume')}
    </Heading>
  );
};

export { Title };
