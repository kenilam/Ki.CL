import React from 'react';

import classNames from 'classnames';

import { Animated } from 'design/components';

import { useSeen } from '@/views/about/use-seen';

import { useVersion } from '@/views/about/resume/context';

import type { Props } from '@/views/about/resume/page/article/timeline/roles/role';

const Organisation: React.FunctionComponent<Props> = ({ id }) => {
  const { ref, seen } = useSeen<HTMLHeadingElement>();
  const role = useVersion().experience.find((each) => {
    return each.id === id;
  });

  if (!role) {
    return null;
  }

  return (
    <Animated.Heading
      className={classNames(
        'kicl-scroll-shift-narrow',
        'kicl-text-box-trim-start',
        'kicl-text-wrap-balance'
      )}
      dense
      easing='ease-expo-out'
      hold
      in={seen}
      is='h3'
      lookLike='h2'
      property='slide-from-left'
      ref={ref}
      stagger={60}
    >
      {role.organisation}
    </Animated.Heading>
  );
};

export { Organisation };
