import React from 'react';

// Components
import { Layout } from '@/Components';

// Partials
import { Article } from './Article';
import { Banner } from './Banner';

// Styles
import './Styles.scss';

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
