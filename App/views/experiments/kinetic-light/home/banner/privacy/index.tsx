import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Icons
import * as Bs from 'react-icons/bs';

// Components
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from 'design/components';

const Privacy: React.FunctionComponent = () => {
  const { t } = useTranslation('kinetic-light');
  const label = t('title', { context: 'privacy' });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          aria-label={label}
          className='kicl-backdrop-blur'
          title={label}
          unstyled
        >
          <Bs.BsInfoCircle aria-hidden />
        </Button>
      </PopoverTrigger>
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
