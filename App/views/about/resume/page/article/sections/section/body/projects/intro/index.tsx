import React from 'react';

import { Animation, Markdown, Text } from 'design/components';

import { useSeen } from '@/views/about/use-seen';

import { useVersion } from '@/views/about/resume/context';

const Intro: React.FunctionComponent = () => {
  const {
    projects: { intro },
  } = useVersion();
  const { ref, seen } = useSeen<HTMLParagraphElement>();

  if (!intro) {
    return null;
  }

  return (
    <Animation
      delay={150}
      duration='slow'
      easing='ease-expo-out'
      hold
      in={seen}
      property='slide-from-left'
    >
      <Text dense lookLike='h3' ref={ref}>
        <Markdown>{intro}</Markdown>
      </Text>
    </Animation>
  );
};

export { Intro };
