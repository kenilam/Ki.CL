import React from 'react';

// Components
import { Layout } from '@/components';

// Details
import { Details } from './details';

// Search
import { Search } from './search';

// Constants
import { CLASS_NAME } from './constants';

const Panel: React.FunctionComponent = () => (
  <Layout
    alignContent='start'
    autoFlow='row'
    className={`${CLASS_NAME}__chrome ${CLASS_NAME}__chrome--panel kicl-position-fixed kicl-inset-block-start kicl-inset-inline-start`}
    gap='narrow'
  >
    <aside aria-label='Taxon'>
      <Search />
      <Details />
    </aside>
  </Layout>
);

export { Panel };
