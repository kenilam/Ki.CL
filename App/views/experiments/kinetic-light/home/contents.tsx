import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Article } from './article';
import { Banner } from './banner';

// Constants
import { CLASS_NAME } from './constants';

const Contents: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='none'>
    <article className={classNames(CLASS_NAME, 'kicl-inline-size-full')}>
      <Banner />
      <Article />
    </article>
  </Layout>
);

export { Contents };
