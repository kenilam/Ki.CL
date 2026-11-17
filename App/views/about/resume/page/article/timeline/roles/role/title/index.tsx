import React from 'react';

import { Animated } from 'design/components';

import { useSeen } from '@/views/about/use-seen';

import { useVersion } from '@/views/about/resume/context';

import type { Props } from '@/views/about/resume/page/article/timeline/roles/role';

const Title: React.FunctionComponent<Props> = ({ id }) => {
  const { ref, seen } = useSeen<HTMLElement>();
  const role = useVersion().experience.find((each) => {
    return each.id === id;
  });

  if (!role) {
    return null;
  }

  return (
    <Animated.Text
      className='kicl-scroll-shift-narrow'
      delay={150}
      dense
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      lookLike='strong'
      property='fade'
      ref={ref}
      stagger={12}
    >
      {role.title}
    </Animated.Text>
  );
};

export { Title };
