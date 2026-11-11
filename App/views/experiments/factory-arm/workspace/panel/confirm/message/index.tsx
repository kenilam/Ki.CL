import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');

  return <Text is='p'>{t('start_over', { context: 'message' })}</Text>;
};

export { Message };
