import React from 'react';

// Components
import { Text } from 'design/components';

// Catalog
import { useNames } from '@/views/experiments/music-visualiser/use-names';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

const Category: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const { category } = useNames(track);

  return (
    <Text is='p' dense variant='secondary'>
      {category}
    </Text>
  );
};

export { Category };
