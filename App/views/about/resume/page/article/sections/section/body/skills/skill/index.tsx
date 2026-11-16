import React from 'react';

import { Animation, ListItem, Markdown, Text } from 'design/components';

import { useSeen } from '@/views/about/use-seen';

import { useVersion } from '@/views/about/resume/context';

type Props = { line: string };

const DELAY = 150;

const STEP = 80;

const Skill: React.FunctionComponent<Props> = ({ line }) => {
  const position = useVersion().skills.indexOf(line);
  const { ref, seen } = useSeen<HTMLLIElement>();

  return (
    <Animation
      delay={DELAY + position * STEP}
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      property='slide-from-left'
    >
      <ListItem className='kicl-print-break-inside-avoid' ref={ref}>
        <Text dense>
          <Markdown>{line}</Markdown>
        </Text>
      </ListItem>
    </Animation>
  );
};

export { Skill };
