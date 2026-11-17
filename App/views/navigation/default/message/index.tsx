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
      aria-label={t('action', { context: 'message' })}
      block
      data-track='Header message'
      command='show-modal'
      commandfor={CONTACT_ID}
      size='small'
      variant='tertiary'
    >
      <Tb.TbMessage />
    </Button>
  );
};

export { Message };
