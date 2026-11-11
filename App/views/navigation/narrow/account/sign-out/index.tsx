import React from 'react';

// Components
import { Animation, Button } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SIGN_OUT_ID } from '@/views/account/constants';

const SignOut: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Animation property='slide-from-bottom' delay={1200}>
      <Button
        before={<Tb.TbLogout aria-hidden className='kicl-rtl-mirror' />}
        className='kicl-inline-size-full'
        command='show-modal'
        commandfor={SIGN_OUT_ID}
        variant='secondary'
      >
        {t('action', { context: 'sign_out' })}
      </Button>
    </Animation>
  );
};

export { SignOut };
