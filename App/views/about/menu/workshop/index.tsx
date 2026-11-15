import React from 'react';

import { Animation, HyperLink } from 'design/components';
import { useTranslation } from 'design/hooks';

import { PAGES } from '@/views/routes';

import { useSeen } from '@/views/about/use-seen';

const Workshop: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { ref, seen } = useSeen<HTMLAnchorElement>();

  return (
    <Animation
      delay={0}
      duration='slower'
      easing='ease-expo-out'
      hold
      in={seen}
      property='slide-from-left'
    >
      <HyperLink
        className='kicl-font-size-medium'
        ref={ref}
        to={PAGES.workshop}
      >
        {t('workshop')}
      </HyperLink>
    </Animation>
  );
};

export { Workshop };
