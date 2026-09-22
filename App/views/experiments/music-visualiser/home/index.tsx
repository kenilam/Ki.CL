import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from '@/components';

// Partials
import { Article } from './article';
import { Banner } from './banner';

// Constants
import { CLASS_NAME } from './constants';

/** The view's index: the banner with its play link, then how it was made. */
const Home: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='none'>
    <article
      className={classNames(CLASS_NAME, 'kicl-padding-block-end-extreme')}
    >
      <Banner />
      <Article />
    </article>
  </Layout>
);

export { CLASS_NAME, Home };
