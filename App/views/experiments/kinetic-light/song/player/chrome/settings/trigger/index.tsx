import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, PopoverTrigger } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Trigger: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <PopoverTrigger asChild>
      <Button
        aria-label={t('label', { context: 'settings' })}
        size='small'
        variant='secondary'
      >
        <Tb.TbAdjustmentsHorizontal aria-hidden />
      </Button>
    </PopoverTrigger>
  );
};

export { Trigger };
