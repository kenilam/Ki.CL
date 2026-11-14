import React from 'react';

import { Animation, Button } from 'design/components';
import { useTranslation } from 'design/hooks';

import { CONTACT_ID } from '@/views/constants';

import { useSeen } from '@/views/about/use-seen';

const Message: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { ref, seen } = useSeen<HTMLButtonElement>();

  return (
    <Animation
      delay={300}
      duration='slower'
      easing='ease-expo-out'
      hold
      in={seen}
      property='slide-from-left'
    >
      <Button
        className='kicl-font-size-medium'
        command='show-modal'
        commandfor={CONTACT_ID}
        data-track='About message'
        lookLikeHyperLink
        ref={ref}
      >
        {t('action', { context: 'message' })}
      </Button>
    </Animation>
  );
};

export { Message };
