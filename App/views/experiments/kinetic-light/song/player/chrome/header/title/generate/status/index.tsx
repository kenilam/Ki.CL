import React from 'react';

// Components
import { AnimatedText, FormDescription } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

// Constants
import { MAX_FILE_SIZE } from '@/views/experiments/kinetic-light/constants';

const Status: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const { busy, cooling, seconds, spent, status } = useGenerateContext();

  let message = t('hint', { context: 'file', size: MAX_FILE_SIZE });
  let key = 'hint';

  if (busy) {
    message = status ?? t('action', { context: 'generating' });
    key = message;
  }

  if (!busy && cooling && !spent) {
    message = t('status', { context: 'cooling', count: seconds });
    key = 'cooling';
  }

  return (
    <FormDescription role='status'>
      <AnimatedText is='span' key={key} split='word'>
        {message}
      </AnimatedText>
    </FormDescription>
  );
};

export { Status };
