import React from 'react';

import { Heading } from 'design/components';
import { useTranslation } from 'design/hooks';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  return (
    <Heading className='kicl-scroll-shift-narrow' dense is='h3' lookLike='h6'>
      {t('title', { context: 'earlier' })}
    </Heading>
  );
};

export { Title };
