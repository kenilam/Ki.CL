import React from 'react';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { useProceed } from './use-proceed';

const Proceed: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const proceed = useProceed();

  return (
    <Button
      className='kicl-inline-size-full'
      justifyContent='center'
      onClick={proceed}
      size='small'
    >
      {t('action', { context: 'proceed' })}
    </Button>
  );
};

export { Proceed };
