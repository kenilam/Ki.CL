import React from 'react';

import * as Tb from 'react-icons/tb';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { CONTACT_ID } from '@/views/constants';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Button
      before={<Tb.TbMessage />}
      command='show-modal'
      commandfor={CONTACT_ID}
      data-track='Header message'
      size='small'
      variant='secondary'
    >
      {t('action', { context: 'message' })}
    </Button>
  );
};

export { Message };
