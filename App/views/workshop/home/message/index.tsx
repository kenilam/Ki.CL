import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation('workshop');

  return <Text>{t('message')}</Text>;
};

export { Message };
