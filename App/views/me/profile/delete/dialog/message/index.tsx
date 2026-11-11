import React from 'react';

// Components
import { Animation, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { MESSAGE_ID } from '@/views/me/profile/constants';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation('me');

  return (
    <Animation delay={300} property='slide-from-top'>
      <Text className='kicl-text-align-center' id={MESSAGE_ID} is='p'>
        {t('description', { context: 'delete' })}
      </Text>
    </Animation>
  );
};

export { Message };
