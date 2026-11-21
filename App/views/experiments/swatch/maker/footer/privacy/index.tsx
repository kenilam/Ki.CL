import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
} from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const Privacy: React.FunctionComponent = () => {
  const { t } = useTranslation('swatch');

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          before={<Tb.TbInfoCircle aria-hidden />}
          className='kicl-align-self-end'
          size='small'
          variant='tertiary'
        >
          {t('label', { context: 'disclaimer' })}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='kicl-max-inline-size-columns-3'
        placement='block-start-start'
      >
        <Text dense is='p' lookLike='small'>
          {t('privacy')}
        </Text>
      </PopoverContent>
    </Popover>
  );
};

export { Privacy };
