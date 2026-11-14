import React from 'react';

// Components
import { Animated, Animation } from 'design/components';

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
      <Animated.Heading dense id={SIGN_OUT_TITLE_ID} level='error' role='alert'>
        {pending
          ? t('sign_out', { context: 'pending' })
          : t('sign_out', { context: 'confirm' })}
      </Animated.Heading>
    </Animation>
  );
};

export { Title };
