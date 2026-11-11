import React from 'react';

// Components
import { AnimatedText, Animation } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SIGN_OUT_MESSAGE_ID } from '@/views/account/constants';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Animation property='slide-from-top'>
      <AnimatedText className='kicl-text-align-center' id={SIGN_OUT_MESSAGE_ID}>
        {t('sign_out', { context: 'message' })}
      </AnimatedText>
    </Animation>
  );
};

export { Message };
