import React from 'react';

// Components
import { AnimatedText, Text } from '@/components';

/** Split so the date can be a `time`; its letters start where the byline's end. */
const BYLINE = 'Keni · Ki.CL · ';
const DELAY = 1000;
const STAGGER = 10;

const Byline: React.FunctionComponent = () => (
  <Text dense>
    <AnimatedText
      delay={DELAY}
      dense
      duration='slower'
      easing='ease-sine-in'
      is='span'
      property='slide-from-bottom'
      stagger={STAGGER}
    >
      {BYLINE}
    </AnimatedText>
    <AnimatedText
      dateTime='2026-08'
      delay={DELAY + BYLINE.length * STAGGER}
      dense
      duration='slower'
      easing='ease-sine-in'
      is='time'
      property='slide-from-bottom'
      stagger={STAGGER}
    >
      August 2026
    </AnimatedText>
  </Text>
);

export { Byline };
