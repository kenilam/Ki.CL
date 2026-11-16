import React from 'react';

import classNames from 'classnames';

import { Layout, List } from 'design/components';

import { useVersion } from '@/views/about/resume/context';

import { Intro } from './intro';
import { Project } from './project';

const Projects: React.FunctionComponent = () => {
  const {
    projects: { items },
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
        {items ? (
          <List gap='narrow' listStyleType='disc'>
            {items.map((line) => {
              return <Project key={line} line={line} />;
            })}
          </List>
        ) : null}
      </div>
    </Layout>
  );
};

export { Projects };
