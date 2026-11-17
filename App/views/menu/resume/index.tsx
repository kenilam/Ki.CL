import React from 'react';

import { Animation, Button } from 'design/components';
import { useTranslation } from 'design/hooks';

import { ENTRY_ID } from '@/views/resume/constants';
import { useSeen } from '@/views/use-seen';

const Resume: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { ref, seen } = useSeen<HTMLButtonElement>();

  return (
    <Animation
      delay={150}
      duration='slower'
      easing='ease-expo-out'
      hold
      in={seen}
      property='slide-from-left'
    >
      <Button
        className='kicl-font-size-medium'
        command='show-modal'
        commandfor={ENTRY_ID}
        lookLikeHyperLink
        ref={ref}
      >
        {t('resume')}
      </Button>
    </Animation>
  );
};

export { Resume };
