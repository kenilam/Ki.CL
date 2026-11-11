import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, PopoverTrigger } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useDaylightContext } from '@/views/experiments/daylight/context';

// Constants
import { PLACES } from '@/views/experiments/daylight/constants';

/** Names the place the globe faces. */
const Trigger: React.FunctionComponent = () => {
  const { active } = useDaylightContext();
  const { t } = useTranslation('daylight');

  return (
    <PopoverTrigger asChild>
      <Button after={<Tb.TbChevronDown aria-hidden />} variant='primary'>
        {t('place', { context: PLACES[active].context })}
      </Button>
    </PopoverTrigger>
  );
};

export { Trigger };
