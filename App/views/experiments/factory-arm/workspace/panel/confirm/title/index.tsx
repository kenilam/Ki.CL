import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

import { TITLE_ID } from '@/views/experiments/factory-arm/workspace/panel/confirm/constants';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');

  return (
    <Heading dense id={TITLE_ID} is='h2' lookLike='h4'>
      {t('start_over', { context: 'title' })}
    </Heading>
  );
};

export { Title };
