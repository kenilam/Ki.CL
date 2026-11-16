import React from 'react';

import { Animation, List } from 'design/components';

import { useShown } from '@/views/about/resume/page/article/intro/use-shown';

import { Download } from './download';
import { Print } from './print';

const Actions: React.FunctionComponent = () => {
  const shown = useShown();

  return (
    <Animation
      delay={400}
      duration='slow'
      easing='ease-expo-out'
      hold
      in={shown}
      property='slide-from-bottom'
    >
      <List
        alignItems='center'
        className='kicl-print-hidden'
        display='flex'
        gap='narrow'
        separated
        wrap
      >
        <Print />
        <Download />
      </List>
    </Animation>
  );
};

export { Actions };
