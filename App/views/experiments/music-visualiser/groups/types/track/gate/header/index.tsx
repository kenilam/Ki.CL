import React from 'react';

// Components
import { BackLink, Heading, Layout } from 'design/components';

// Catalog
import { useNames } from '@/views/experiments/music-visualiser/use-names';

// Context
import { useTrackContext } from '@/views/experiments/music-visualiser/groups/types/track/context';

// Constants
import { toPath } from '@/views/experiments/music-visualiser/constants';

const Header: React.FunctionComponent = () => {
  const { track } = useTrackContext();
  const { title } = useNames(track);

  return (
    <Layout autoFlow='row' gap='none' justifyItems='center'>
      <header>
        <BackLink className='kicl-margin-block-end' to={toPath()} />
        <Heading is='h1' dense className='kicl-font-size-huge'>
          {title}
        </Heading>
      </header>
    </Layout>
  );
};

export { Header };
