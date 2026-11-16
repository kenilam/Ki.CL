import React from 'react';

import { Animated } from 'design/components';

import { useVersion } from '@/views/about/resume/context';
import { useShown } from '@/views/about/resume/page/article/intro/use-shown';

const Headline: React.FunctionComponent = () => {
  const { headline } = useVersion();
  const shown = useShown();

  return (
    <Animated.Text
      className='kicl-text-wrap-balance'
      delay={240}
      dense
      easing='ease-expo-out'
      hold
      in={shown}
      lookLike='h2'
      stagger={40}
    >
      {headline}
    </Animated.Text>
  );
};

export { Headline };
