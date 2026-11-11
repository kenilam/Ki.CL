import React from 'react';

// Components
import { Button, PopoverTrigger, Text } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

const Trigger: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <PopoverTrigger asChild>
      <Button className='kicl-font-size' unstyled>
        <Tb.TbUserCircle aria-hidden />
        <Text className='kicl-hidden' is='span'>
          {t('account')}
        </Text>
      </Button>
    </PopoverTrigger>
  );
};

export { Trigger };
