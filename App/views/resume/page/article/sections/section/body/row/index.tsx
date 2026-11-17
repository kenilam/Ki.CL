import React from 'react';

import { Animated, ListItem } from 'design/components';

import { useSeen } from '@/views/use-seen';

type Props = { line: string };

const LEAD = /^\*\*(.+?)\p{P}?\*\*\s*(.*)$/su;

const Row: React.FunctionComponent<Props> = ({ line }) => {
  const { ref, seen } = useSeen<HTMLLIElement>();
  const [, title, body = line] = line.match(LEAD) ?? [];

  return (
    <ListItem gap='narrow' ref={ref}>
      {title ? (
        <Animated.Heading
          className='kicl-text-wrap-balance'
          dense
          easing='ease-expo-out'
          hold
          in={seen}
          is='h3'
          lookLike='h2'
          property='slide-from-left'
          stagger={60}
        >
          {title}
        </Animated.Heading>
      ) : null}
      <Animated.Text
        className='kicl-text-hyphenate'
        delay={150}
        dense
        duration='slow'
        easing='ease-expo-out'
        hold
        in={seen}
        property='fade'
        stagger={12}
      >
        {body}
      </Animated.Text>
    </ListItem>
  );
};

export { Row };
