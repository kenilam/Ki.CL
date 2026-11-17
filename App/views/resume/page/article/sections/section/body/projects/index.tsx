import React from 'react';

import classNames from 'classnames';

import { Layout, List } from 'design/components';

import { useVersion } from '@/views/resume/context';

import { Line } from '@/views/resume/page/article/sections/section/body/line';
import { Row } from '@/views/resume/page/article/sections/section/body/row';

import { Intro } from './intro';

const Projects: React.FunctionComponent = () => {
  const {
    projects: { items = [] },
  } = useVersion();

  return (
    <Layout autoFlow='row' gap='wide'>
      <div
        className={classNames(
          'kicl-max-inline-size-columns-8',
          'kicl-scroll-enter-near'
        )}
      >
        <Intro />
        <List className='kicl-print-hidden' gap='wide'>
          {items.map((line) => {
            return <Row key={line} line={line} />;
          })}
        </List>
        <List className='kicl-print-only' gap='narrow' listStyleType='disc'>
          {items.map((line) => {
            return <Line key={line} line={line} />;
          })}
        </List>
      </div>
    </Layout>
  );
};

export { Projects };
