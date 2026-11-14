import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Lead } from '@/views/about/intro/lead';
import { Links } from '@/views/about/intro/links';
import { Name } from '@/views/about/intro/name';
import { Title } from '@/views/about/intro/title';

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
        <Layout autoFlow='row' gap='normal' justifyItems='start'>
          <div
            className={classNames('kicl-grid-column-full', 'kicl-grid-row-2')}
          >
            <Name />
            <Lead />
            <Links />
          </div>
        </Layout>
      </div>
    </Layout>
  );
};

export { Wider };
