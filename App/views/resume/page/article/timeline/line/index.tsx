import React from 'react';

import classNames from 'classnames';

import { Animated, Animation, ListItem } from 'design/components';

import { useSeen } from '@/views/use-seen';

type Props = { line: string };

const Line: React.FunctionComponent<Props> = ({ line }) => {
  const { ref, seen } = useSeen<HTMLLIElement>();

  return (
    <Animation
      delay={150}
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      property='fade'
    >
      <ListItem className='kicl-print-break-inside-avoid' ref={ref}>
        <Animated.Text
          className={classNames(
            'kicl-scroll-shift-narrow',
            'kicl-text-hyphenate'
          )}
          delay={150}
          dense
          duration='slow'
          easing='ease-expo-out'
          hold
          in={seen}
          property='fade'
          stagger={12}
        >
          {line}
        </Animated.Text>
      </ListItem>
    </Animation>
  );
};

export { Line };
