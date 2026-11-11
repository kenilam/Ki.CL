import React from 'react';

// Components
import { Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { PAST_ID } from '@/views/experiments/image-agent/start/constants';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');

  return (
    <Heading id={PAST_ID} is='h2' dense>
      {t('title', { context: 'past' })}
    </Heading>
  );
};

export { Title };
