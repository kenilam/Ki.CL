import React from 'react';

// Components
import { Animated, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';
import { useCard } from '@/views/experiments/swatch/use-card';

const STAGES = {
  ANIMATING: 'animating',
  DRAWING: 'drawing',
  NAMING: 'naming',
} as const;

const Status: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    swatch: useTranslation('swatch'),
  };
  const swatch = useCard();

  if (swatch === null) {
    return (
      <Text is='p' variant='secondary'>
        {translations.swatch.t('missing')}
      </Text>
    );
  }

  if (swatch?.failure) {
    return (
      <Text is='p' level='error'>
        {swatch.failure}
      </Text>
    );
  }

  if (!swatch?.stage) {
    return null;
  }

  const status = translations.common.t('swatch', {
    context: STAGES[swatch.stage],
  });

  return (
    <Text is='p' role='status' variant='secondary'>
      <Animated.Text is='span' key={status} split='word'>
        {status}
      </Animated.Text>
    </Text>
  );
};

export { Status };
