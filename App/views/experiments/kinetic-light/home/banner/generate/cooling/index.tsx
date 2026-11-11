import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

const Cooling: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const { cooling, running, seconds } = useGenerateContext();

  if (!cooling || running) {
    return null;
  }

  return (
    <Text is='p' role='status' variant='secondary'>
      {t('status', { context: 'cooling', count: seconds })}
    </Text>
  );
};

export { Cooling };
