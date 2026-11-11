import React from 'react';

// Components
import { AnimatedText, Animation } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSignOutContext } from '@/views/account/sign-out/context';

const Failed: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { state } = useSignOutContext();

  return (
    <Animation in={state === 'failed'}>
      <AnimatedText level='error' is='p' role='alert'>
        {t('sign_out', { context: 'failed' })}
      </AnimatedText>
    </Animation>
  );
};

export { Failed };
