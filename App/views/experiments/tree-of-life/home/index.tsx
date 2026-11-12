import React from 'react';

// Components
import { Layout } from 'design/components';

// Partials
import { Article } from './article';
import { Banner } from './banner';

// Constants
import { CLASS_NAME } from './constants';

const Home: React.FunctionComponent = () => {
  return (
    <Layout gap='wide'>
      <article className={CLASS_NAME}>
        <Banner />
        <Article />
      </article>
    </Layout>
  );
};

export { Home };
