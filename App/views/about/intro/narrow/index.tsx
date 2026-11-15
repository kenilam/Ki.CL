import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Lead } from '@/views/about/intro/lead';
import { Links } from '@/views/about/intro/links';
import { Name } from '@/views/about/intro/name';
import { Title } from '@/views/about/intro/title';

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
            <Name />
            <Lead />
            <Links />
          </div>
        </Layout>
      </div>
    </Layout>
  );
};

export { Narrow };
