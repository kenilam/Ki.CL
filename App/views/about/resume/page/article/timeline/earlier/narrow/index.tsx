import React from 'react';

import { Layout } from 'design/components';

import { Lines } from '@/views/about/resume/page/article/timeline/earlier/lines';
import { Title } from '@/views/about/resume/page/article/timeline/earlier/title';

const Narrow: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='narrow'>
      <div className='kicl-padding-inline-end-extreme'>
        <Title />
        <Lines />
      </div>
    </Layout>
  );
};

export { Narrow };
