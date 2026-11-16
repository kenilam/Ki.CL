import React from 'react';

import classNames from 'classnames';

import { Layout } from 'design/components';

import { Links } from '@/views/about/resume/page/article/intro/links';
import { Location } from '@/views/about/resume/page/article/intro/location';
import { Summary } from '@/views/about/resume/page/article/intro/summary';
import { Title } from '@/views/about/resume/page/article/intro/title';

import './styles.scss';

import { CLASS_NAME as INTRO } from '@/views/about/resume/page/article/intro/constants';

const Default: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='column' frames='1fr--5fr--6fr' gap='wide'>
      <div
        className={classNames(
          `${INTRO}__default`,
          'kicl-grid-template-rows-1fr-auto'
        )}
      >
        <Title />
        <Layout autoFlow='row' gap='narrower' justifyItems='start'>
          <div
            className={classNames(
              'kicl-grid-column-3',
              'kicl-grid-row-2',
              'kicl-text-align-start'
            )}
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

export { Default };
