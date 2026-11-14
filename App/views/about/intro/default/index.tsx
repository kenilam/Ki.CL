import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Lead } from '@/views/about/intro/lead';
import { Links } from '@/views/about/intro/links';
import { Name } from '@/views/about/intro/name';
import { Title } from '@/views/about/intro/title';

const Default: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='column' frames='1fr--5fr--6fr' gap='wide'>
      <div
        className={classNames(
          'kicl-grid-template-rows-1fr-auto',
          'kicl-text-align-end'
        )}
      >
        <Title />
        <Layout autoFlow='row' gap='normal' justifyItems='start'>
          <div
            className={classNames(
              'kicl-grid-column-3',
              'kicl-grid-row-2',
              'kicl-text-align-start'
            )}
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

export { Default };
