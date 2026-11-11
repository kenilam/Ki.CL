import React from 'react';

// Components
import { AnimatedText, Animation, Heading } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSignOutContext } from '@/views/account/sign-out/context';

// Constants
import { SIGN_OUT_TITLE_ID } from '@/views/account/constants';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { pending } = useSignOutContext();

  return (
    <Animation property='slide-from-top'>
      <Heading dense id={SIGN_OUT_TITLE_ID}>
        <AnimatedText level='error' is='span' role='alert'>
          {pending
            ? t('sign_out', { context: 'pending' })
            : t('sign_out', { context: 'confirm' })}
        </AnimatedText>
      </Heading>
    </Animation>
  );
};

export { Title };
