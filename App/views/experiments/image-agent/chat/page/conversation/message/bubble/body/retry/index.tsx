import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useRetry } from './use-retry';

const Retry: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { again, shown } = useRetry();
  const label = t('action', { context: 'retry' });

  if (!shown) {
    return null;
  }

  return (
    <Button
      aria-label={label}
      onClick={again}
      title={label}
      type='button'
      variant='tertiary'
    >
      <Tb.TbCornerUpRight aria-hidden className='kicl-rtl-mirror' />
    </Button>
  );
};

export { Retry };
