import React from 'react';

import { Button, ListItem } from 'design/components';
import { useTranslation } from 'design/hooks';

import { CONTACT_ID } from '@/views/constants';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem className='kicl-print-hidden'>
      <Button
        className='kicl-font-family-mono'
        command='show-modal'
        commandfor={CONTACT_ID}
        data-track='Resume message'
        lookLikeHyperLink
      >
        {t('action', { context: 'message' })}
      </Button>
    </ListItem>
  );
};

export { Message };
