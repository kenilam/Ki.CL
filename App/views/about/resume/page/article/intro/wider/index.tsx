import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Links } from '@/views/about/resume/page/article/intro/links';
import { Location } from '@/views/about/resume/page/article/intro/location';
import { Summary } from '@/views/about/resume/page/article/intro/summary';
import { Title } from '@/views/about/resume/page/article/intro/title';

const Wider: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='column' frames='6fr--6fr' gap='wide'>
      <div
        className={classNames(
          'kicl-grid-template-rows-1fr-auto',
          'kicl-padding-inline-end-extreme'
        )}
      >
        <Title />
        <Layout autoFlow='row' gap='narrower' justifyItems='start'>
          <div
            className={classNames('kicl-grid-column-full', 'kicl-grid-row-2')}
          >
            <Summary />
            <Location />
            <Links />
          </div>
        </Layout>
      </div>
    </Layout>
  );
};

export { Wider };
