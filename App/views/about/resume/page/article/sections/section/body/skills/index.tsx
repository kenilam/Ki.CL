import React from 'react';

import classNames from 'classnames';

import { Layout, List } from 'design/components';

import { useVersion } from '@/views/about/resume/context';

import { Line } from '@/views/about/resume/page/article/sections/section/body/line';
import { Row } from '@/views/about/resume/page/article/sections/section/body/row';

const Skills: React.FunctionComponent = () => {
  const { skills } = useVersion();

  return (
    <Layout autoFlow='row' gap='wide'>
      <div
        className={classNames(
          'kicl-max-inline-size-columns-8',
          'kicl-scroll-enter-near'
        )}
      >
        <List className='kicl-print-hidden' gap='wide'>
          {skills.map((line) => {
            return <Row key={line} line={line} />;
          })}
        </List>
        <List className='kicl-print-only' gap='narrow' listStyleType='disc'>
          {skills.map((line) => {
            return <Line key={line} line={line} />;
          })}
        </List>
      </div>
    </Layout>
  );
};

export { Skills };
