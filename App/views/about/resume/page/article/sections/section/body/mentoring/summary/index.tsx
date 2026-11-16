import React from 'react';

import { Markdown, Text } from 'design/components';

import { useVersion } from '@/views/about/resume/context';

const Summary: React.FunctionComponent = () => {
  const { mentoring } = useVersion();

  return (
    <Text className='kicl-print-only' dense>
      <Markdown>{mentoring}</Markdown>
    </Text>
  );
};

export { Summary };
