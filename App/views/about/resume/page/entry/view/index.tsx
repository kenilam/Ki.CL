import React from 'react';

import * as Tb from 'react-icons/tb';

import { Button, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { ENTRY_ID } from '@/views/about/resume/constants';

const View: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');

  return (
    <ListItem>
      <Button
        before={<Tb.TbWorld aria-hidden />}
        className='kicl-inline-size-full'
        command='close'
        commandfor={ENTRY_ID}
        data-track='Resume view'
        justifyContent='center'
        size='large'
      >
        {t('action', { context: 'view' })}
      </Button>
    </ListItem>
  );
};

export { View };
