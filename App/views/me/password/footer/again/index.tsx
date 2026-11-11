import React from 'react';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePasswordChangeContext } from '@/views/context';

const Again: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { reset, stage } = usePasswordChangeContext();

  if (stage !== 'expired' && stage !== 'failed') {
    return null;
  }

  return (
    <Button onClick={reset} size='small'>
      {t('action', { context: 'again' })}
    </Button>
  );
};

export { Again };
