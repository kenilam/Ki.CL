import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

import { MESSAGE_ID } from '@/views/experiments/factory-arm/workspace/panel/confirm/constants';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');

  return (
    <Text id={MESSAGE_ID} is='p'>
      {t('start_over', { context: 'message' })}
    </Text>
  );
};

export { Message };
