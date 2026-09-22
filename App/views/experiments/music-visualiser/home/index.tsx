import React from 'react';

// Components
import { Layout } from '@/components';

// Partials
import { Article } from './article';
import { Banner } from './banner';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME } from './constants';

/** The view's index: the banner with its play link, then how it was made. */
const Home: React.FunctionComponent = () => (
  <Layout autoFlow='row' gap='none'>
    <article className={CLASS_NAME}>
      <Banner />
      <Article />
    </article>
  </Layout>
);

export { CLASS_NAME, Home };
