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

  if (!shown) {
    return null;
  }

  return (
    <Button
      aria-label={t('action', { context: 'retry' })}
      onClick={again}
      type='button'
      variant='tertiary'
    >
      <Tb.TbCornerUpRight aria-hidden className='kicl-rtl-mirror' />
    </Button>
  );
};

export { Retry };
