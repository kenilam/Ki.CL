import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';

import { useSeen } from '@/views/about/use-seen';

import { useVersion } from '@/views/about/resume/context';

const Languages: React.FunctionComponent = () => {
  const { languages } = useVersion();
  const { ref, seen } = useSeen<HTMLElement>();

  return (
    <Animated.Text
      className={classNames(
        'kicl-max-inline-size-columns-8',
        'kicl-scroll-enter-near'
      )}
      delay={150}
      dense
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      property='slide-from-left'
      ref={ref}
      stagger={12}
    >
      {languages}
    </Animated.Text>
  );
};

export { Languages };
