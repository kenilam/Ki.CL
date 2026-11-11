import React from 'react';

// Icons
import * as Tb from 'react-icons/tb';

// Components
import { Button, ListItem, Text } from 'design/components';

// Hooks
import { useResponsive, useTranslation } from 'design/hooks';

// Constants
import { CONTACT_ID } from '@/views/constants';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const { isNarrow } = useResponsive();

  const text = t('action', { context: 'message' });

  return (
    <ListItem>
      <Button
        before={<Tb.TbMessageDots aria-hidden />}
        command='show-modal'
        commandfor={CONTACT_ID}
        data-track='Resume message'
        size='small'
        variant='ghost'
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

export { Message };
