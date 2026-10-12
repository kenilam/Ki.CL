import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { AnimatedText, Text } from 'design/components';

const DELAY = 1000;
const STAGGER = 10;

/** Split so the date can be a `time`; its letters start where the byline's end. */
const Byline: React.FunctionComponent = () => {
  const { t } = useTranslation('pika');

  const byline = t('byline');

  return (
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
        {byline}
      </AnimatedText>
      <AnimatedText
        dateTime='2026-08'
        delay={DELAY + byline.length * STAGGER}
        dense
        duration='slower'
        easing='ease-sine-in'
        is='time'
        property='slide-from-bottom'
        stagger={STAGGER}
      >
        {t('date')}
      </AnimatedText>
    </Text>
  );
};

export { Byline };
