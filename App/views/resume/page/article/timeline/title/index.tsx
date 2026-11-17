import React from 'react';

import { Heading } from 'design/components';
import { useTranslation } from 'design/hooks';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  return (
    <Heading dense is='h2' lookLike='h6'>
      {t('title', { context: 'experience' })}
    </Heading>
  );
};

export { Title };
