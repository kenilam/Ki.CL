import React from 'react';

import { Animation, List } from 'design/components';
import { useTranslation } from 'design/hooks';

import { useWithin } from '@/views/about/intro/use-within';

import { Experiments } from './experiments';
import { Message } from './message';
import { Resume } from './resume';

const Links: React.FunctionComponent = () => {
  const { t } = useTranslation('about');
  const { ref, within } = useWithin<HTMLElement>();

  return (
    <nav aria-label={t('links')} className='kicl-scroll-leave-near' ref={ref}>
      <Animation
        delay={320}
        duration='slow'
        easing='ease-expo-out'
        hold
        in={within}
        property='slide-from-bottom'
      >
        <List alignItems='center' display='flex' gap='narrow' separated wrap>
          <Experiments />
          <Resume />
          <Message />
        </List>
      </Animation>
    </nav>
  );
};

export { Links };
