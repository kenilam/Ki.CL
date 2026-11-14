import React from 'react';

// Components
import { Animated, Text } from 'design/components';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

const Status: React.FunctionComponent = () => {
  const { status } = useGenerateContext();

  if (!status) {
    return null;
  }

  return (
    <Text is='p' role='status' variant='secondary'>
      <Animated.Text is='span' key={status} split='word'>
        {status}
      </Animated.Text>
    </Text>
  );
};

export { Status };
