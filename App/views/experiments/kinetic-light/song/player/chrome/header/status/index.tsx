import React from 'react';

// Components
import { Markdown, Text } from 'design/components';

// Hooks
import { useLine } from './use-line';

const Status: React.FunctionComponent = () => {
  const line = useLine();

  return (
    <Text is='p' dense role='status' variant='secondary'>
      <Markdown>{line}</Markdown>
    </Text>
  );
};

export { Status };
