import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { CONTACT_ID } from '@/views/constants';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <Button
        before={<Tb.TbMessageDots aria-hidden />}
        command='show-modal'
        commandfor={CONTACT_ID}
        data-track='Resume message'
        iconOnlyUpTo='narrow'
        size='small'
        variant='ghost'
      >
        {t('action', { context: 'message' })}
      </Button>
    </ListItem>
  );
};

export { Message };
