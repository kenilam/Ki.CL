import React from 'react';

// Components
import { Animation, Button, SheetFooter } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useLogContext } from '@/views/experiments/factory-arm/log-context';

const Clear: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { clearLog, log } = useLogContext();

  if (!log.length) {
    return null;
  }

  return (
    <Animation property='slide-from-bottom'>
      <SheetFooter>
        <Button
          className='kicl-inline-size-full'
          justifyContent='center'
          onClick={clearLog}
          size='small'
          variant='secondary'
        >
          {t('action', { context: 'clear' })}
        </Button>
      </SheetFooter>
    </Animation>
  );
};

export { Clear };
