import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSessionContext } from '@/session/context';

// Constants
import { MESSAGE_ID } from '@/session/challenge/constants';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { interactive } = useSessionContext().turnstile;

  return (
    <Text className='kicl-font-size-small' id={MESSAGE_ID} is='p'>
      {interactive
        ? t('session', { context: 'interact' })
        : t('session', { context: 'wait' })}
    </Text>
  );
};

export { Message };
