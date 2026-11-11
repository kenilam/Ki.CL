import React from 'react';

// Components
import { AnimatedText, Text } from 'design/components';

// Context
import { useGenerateContext } from '@/views/experiments/kinetic-light/context';

const Status: React.FunctionComponent = () => {
  const { status } = useGenerateContext();

  if (!status) {
    return null;
  }

  return (
    <Text is='p' role='status' variant='secondary'>
      <AnimatedText is='span' key={status} split='word'>
        {status}
      </AnimatedText>
    </Text>
  );
};

export { Status };
