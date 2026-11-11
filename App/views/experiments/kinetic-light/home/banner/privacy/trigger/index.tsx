import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, PopoverTrigger } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Trigger: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const label = t('title', { context: 'privacy' });

  return (
    <PopoverTrigger asChild>
      <Button
        aria-label={label}
        className='kicl-backdrop-blur'
        title={label}
        unstyled
      >
        <Tb.TbInfoCircle aria-hidden />
      </Button>
    </PopoverTrigger>
  );
};

export { Trigger };
