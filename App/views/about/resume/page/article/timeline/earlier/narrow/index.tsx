import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Lines } from '@/views/about/resume/page/article/timeline/earlier/lines';
import { Title } from '@/views/about/resume/page/article/timeline/earlier/title';

const Narrow: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='narrow'>
      <div
        className={classNames(
          'kicl-padding-inline-end-extreme',
          'kicl-scroll-enter'
        )}
      >
        <Title />
        <Lines />
      </div>
    </Layout>
  );
};

export { Narrow };
