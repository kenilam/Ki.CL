import React from 'react';

// Components
import { Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useMessageContext } from '@/views/experiments/image-agent/chat/page/conversation/message/context';

const Role: React.FunctionComponent = () => {
  const { t } = useTranslation('image-agent');
  const { message } = useMessageContext();

  return (
    <Text is='span' className='kicl-hidden'>
      {t('role', { context: message.role === 'USER' ? 'you' : 'agent' })}
    </Text>
  );
};

export { Role };
