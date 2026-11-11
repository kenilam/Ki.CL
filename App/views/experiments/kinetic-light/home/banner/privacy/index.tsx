import React from 'react';

// Components
import { Popover, PopoverContent, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Trigger } from './trigger';

const Privacy: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');

  return (
    <Popover>
      <Trigger />
      <PopoverContent
        className='kicl-max-inline-size-columns-4'
        offset='normal'
        placement='block-start-start'
      >
        <Text className='kicl-font-size-small' dense is='p' variant='secondary'>
          {t('privacy')}
        </Text>
      </PopoverContent>
    </Popover>
  );
};

export { Privacy };
