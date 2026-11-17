import React from 'react';

import { Animated } from 'design/components';

import { useSeen } from '@/views/about/use-seen';

import { useVersion } from '@/views/about/resume/context';

const Intro: React.FunctionComponent = () => {
  const {
    projects: { intro },
  } = useVersion();
  const { ref, seen } = useSeen<HTMLElement>();

  if (!intro) {
    return null;
  }

  return (
    <Animated.Text
      delay={150}
      dense
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      lookLike='h3'
      property='fade'
      ref={ref}
      stagger={12}
    >
      {intro}
    </Animated.Text>
  );
};

export { Intro };
