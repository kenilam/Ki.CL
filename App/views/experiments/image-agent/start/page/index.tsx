import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Article } from './article';
import { Hero } from './hero';

// Constants
import { CLASS_NAME } from '@/views/experiments/image-agent/start/constants';

const Page: React.FunctionComponent = () => {
  return (
    <Layout autoFlow='row' gap='none' justifyContent='stretch'>
      <article className={classNames(CLASS_NAME, 'kicl-inline-size-full')}>
        <Hero />
        <Article />
      </article>
    </Layout>
  );
};

export { Page };
