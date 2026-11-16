import React from 'react';

import * as Tb from 'react-icons/tb';

import { Button, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { ENTRY_ID } from '@/views/about/resume/constants';

const print = () => {
  window.print();
};

const Print: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <Button
        before={<Tb.TbPrinter aria-hidden />}
        className='kicl-inline-size-full'
        command='close'
        commandfor={ENTRY_ID}
        data-track='Resume print'
        justifyContent='center'
        onClick={print}
        size='large'
        variant='secondary'
      >
        {t('action', { context: 'print' })}
      </Button>
    </ListItem>
  );
};

export { Print };
