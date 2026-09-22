import React from 'react';

// Components
import { Layout } from '@/components';

// Partials
import { Bookmark } from './bookmark';
import { Share } from './share';

const Actions: React.FunctionComponent = () => (
  <Layout
    alignContent='center'
    alignItems='center'
    autoFlow='column'
    gap='narrow'
    justifyItems='center'
    justifyContent='center'
  >
    <div>
      <Bookmark />
      <Share />
    </div>
  </Layout>
);

export { Actions };
