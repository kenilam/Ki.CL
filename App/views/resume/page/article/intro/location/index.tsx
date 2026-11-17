import React from 'react';

import { Animated } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useShown } from '@/views/resume/page/article/intro/use-shown';

const Location: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const shown = useShown();

  return (
    <Animated.Text
      className='kicl-scroll-leave-near'
      dense
      easing='ease-expo-out'
      hold
      in={shown}
      stagger={40}
      variant='secondary'
    >
      {t('location')}
    </Animated.Text>
  );
};

export { Location };
