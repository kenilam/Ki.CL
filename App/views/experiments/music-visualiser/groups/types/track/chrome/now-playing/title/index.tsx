import React from 'react';

// Components
import { Heading } from 'design/components';

// Catalog
import { useNames } from '@/views/experiments/music-visualiser/use-names';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

const Title: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const { title } = useNames(track);

  return (
    <Heading aria-live='polite' className='kicl-font-size-large' dense is='h1'>
      {title}
    </Heading>
  );
};

export { Title };
