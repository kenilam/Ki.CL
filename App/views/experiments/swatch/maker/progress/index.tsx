import React from 'react';

// API
import { Kicl_SwatchDocument, skipToken, useQuery } from 'api/provider';

// Components
import { Animated, Text } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useMaker } from '@/views/experiments/swatch/maker/context';

const STAGES = {
  ANIMATING: 'animating',
  DRAWING: 'drawing',
  NAMING: 'naming',
} as const;

const Progress: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { pending } = useMaker();
  const { data } = useQuery(
    Kicl_SwatchDocument,
    pending
      ? { fetchPolicy: 'cache-first', variables: { id: pending } }
      : skipToken
  );
  const swatch = data?.swatch;

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

  const status = t('swatch', { context: STAGES[swatch.stage] });

  return (
    <Text is='p' role='status' variant='secondary'>
      <Animated.Text is='span' key={status} split='word'>
        {status}
      </Animated.Text>
    </Text>
  );
};

export { Progress };
