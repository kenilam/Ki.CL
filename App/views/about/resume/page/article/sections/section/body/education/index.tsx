import React from 'react';

import classNames from 'classnames';

import { Layout, List } from 'design/components';

import { findVersion } from '@/views/about/resume/content';
import { useVersion } from '@/views/about/resume/context';

import { Line } from '@/views/about/resume/page/article/sections/section/body/line';

import { Degree } from './degree';

import './styles.scss';

const Education: React.FunctionComponent = () => {
  const { education, slug } = useVersion();
  const keys = findVersion(slug)?.education ?? [];

  return (
    <Layout autoFlow='row' gap='wide'>
      <div
        className={classNames(
          'kicl-max-inline-size-columns-8',
          'kicl-scroll-enter-near'
        )}
      >
        <List className='kicl-print-hidden' gap='wider'>
          {keys.map((id) => {
            return <Degree id={id} key={id} />;
          })}
        </List>
        <List className='kicl-print-only' gap='narrow' listStyleType='disc'>
          {education.map((line) => {
            return <Line key={line} line={line} />;
          })}
        </List>
      </div>
    </Layout>
  );
};

export { Education };
