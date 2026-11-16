import React from 'react';

import { Animation, ListItem, Markdown, Text } from 'design/components';

import { useSeen } from '@/views/about/use-seen';

import { useVersion } from '@/views/about/resume/context';

type Props = { line: string };

const DELAY = 230;

const STEP = 80;

const Project: React.FunctionComponent<Props> = ({ line }) => {
  const {
    projects: { items = [] },
  } = useVersion();
  const { ref, seen } = useSeen<HTMLLIElement>();

  const position = items.indexOf(line);

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

export { Project };
