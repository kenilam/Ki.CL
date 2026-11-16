import React from 'react';

import { Animated } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useSeen } from '@/views/about/use-seen';

const Profile: React.FunctionComponent = () => {
  const { t } = useTranslation('resume');
  const { ref, seen } = useSeen<HTMLElement>();

  return (
    <Animated.Text
      className='kicl-print-hidden'
      dense
      hold
      in={seen}
      property='slide-from-bottom'
      ref={ref}
      split='letter'
    >
      {t('links.adplist')}
    </Animated.Text>
  );
};

export { Profile };
