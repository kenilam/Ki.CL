import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, ListItem, Text } from 'design/components';

// Hooks
import { useResponsive, useTranslation } from 'design/hooks';

const print = () => {
  window.print();
};

const Print: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { isNarrow } = useResponsive();

  const text = t('action', { context: 'print' });

  return (
    <ListItem>
      <Button
        before={<Tb.TbPrinter aria-hidden />}
        data-track='Resume print'
        onClick={print}
        size='small'
        variant='secondary'
      >
        {isNarrow ? (
          <Text className='kicl-hidden' is='span'>
            {text}
          </Text>
        ) : (
          text
        )}
      </Button>
    </ListItem>
  );
};

export { Print };
