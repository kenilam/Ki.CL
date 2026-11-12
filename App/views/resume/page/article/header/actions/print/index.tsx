import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

const print = () => {
  window.print();
};

const Print: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <Button
        before={<Tb.TbPrinter aria-hidden />}
        data-track='Resume print'
        iconOnlyUpTo='narrow'
        onClick={print}
        size='small'
        variant='secondary'
      >
        {t('action', { context: 'print' })}
      </Button>
    </ListItem>
  );
};

export { Print };
