import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Links } from '@/views/about/resume/page/article/intro/links';
import { Location } from '@/views/about/resume/page/article/intro/location';
import { Summary } from '@/views/about/resume/page/article/intro/summary';
import { Title } from '@/views/about/resume/page/article/intro/title';

const Narrow: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='wide'>
      <div
        className={classNames(
          'kicl-grid-template-columns-shrink',
          'kicl-grid-template-rows-1fr-auto'
        )}
      >
        <Title />
        <Layout autoFlow='row' gap='narrower' justifyItems='start'>
          <div className='kicl-padding-inline-end-extreme'>
            <Summary />
            <Location />
            <Links />
          </div>
        </Layout>
      </div>
    </Layout>
  );
};

export { Narrow };
