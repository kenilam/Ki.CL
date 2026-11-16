import React from 'react';

import { Animation, List } from 'design/components';

import { useShown } from '@/views/about/resume/page/article/intro/use-shown';

import { Email } from './email';
import { Message } from './message';
import { Phone } from './phone';
import { Profiles } from './profiles';
import { Site } from './site';

const Contact: React.FunctionComponent = () => {
  const shown = useShown();

  return (
    <Animation
      delay={320}
      duration='slow'
      easing='ease-expo-out'
      hold
      in={shown}
      property='slide-from-bottom'
    >
      <List alignItems='center' display='flex' gap='narrow' separated wrap>
        <Email />
        <Phone />
        <Profiles />
        <Site />
        <Message />
      </List>
    </Animation>
  );
};

export { Contact };
