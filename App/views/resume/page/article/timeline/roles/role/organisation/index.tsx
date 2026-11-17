import React from 'react';

import classNames from 'classnames';

import { Animated, Animation, Layout } from 'design/components';

import { useSeen } from '@/views/use-seen';

import { EMPLOYERS } from '@/views/resume/content';
import { useVersion } from '@/views/resume/context';

import type { Props } from '@/views/resume/page/article/timeline/roles/role';

import { LOGOS } from './constants';

const Organisation: React.FunctionComponent<Props> = ({ id }) => {
  const { ref, seen } = useSeen<HTMLDivElement>();
  const role = useVersion().experience.find((each) => {
    return each.id === id;
  });

  if (!role) {
    return null;
  }

  const Logo = LOGOS[EMPLOYERS[id]];

  return (
    <Layout alignItems='center' display='flex' gap='narrow'>
      <div className='kicl-scroll-shift-narrow' ref={ref}>
        <Animation
          duration='slower'
          easing='ease-expo-out'
          hold
          in={seen}
          property='slide-from-left'
        >
          <Logo
            aria-hidden
            className={classNames('kicl-font-size-medium', 'kicl-print-hidden')}
          />
        </Animation>
        <Animated.Heading
          className={classNames(
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
          stagger={60}
        >
          {role.organisation}
        </Animated.Heading>
      </div>
    </Layout>
  );
};

export { Organisation };
