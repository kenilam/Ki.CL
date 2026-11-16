import React from 'react';

import { Heading } from 'design/components';
import { useTranslation } from 'design/hooks';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  return (
    <Heading dense is='h3' lookLike='h4'>
      {t('title', { context: 'recognition' })}
    </Heading>
  );
};

export { Title };
