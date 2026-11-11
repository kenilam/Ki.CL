import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');

  return (
    <Heading is='h1' className='kicl-hidden'>
      {t('title')}
    </Heading>
  );
};

export { Title };
