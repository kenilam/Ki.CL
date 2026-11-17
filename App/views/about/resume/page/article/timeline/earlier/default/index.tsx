import React from 'react';

import { Layout } from 'design/components';

import { Lines } from '@/views/about/resume/page/article/timeline/earlier/lines';
import { Title } from '@/views/about/resume/page/article/timeline/earlier/title';

const Default: React.FunctionComponent = () => {
  return (
    <Layout
      alignItems='baseline'
      autoFlow='column'
      frames='3fr--9fr'
      gap='normal'
    >
      <div>
        <Title />
        <Lines />
      </div>
    </Layout>
  );
};

export { Default };
