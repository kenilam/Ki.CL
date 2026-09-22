import React from 'react';

// Partials
import { Article } from './article';
import { Banner } from './banner';
import { Layout } from '@/components';

// Styles
import './styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life';

const Home: React.FunctionComponent = () => {
  return (
    <Layout gap='wide'>
      <article
        className={`${CLASS_NAME} kicl-padding-block-start-header kicl-padding-block-end-extreme`}
      >
        <Banner />
        <Article />
      </article>
    </Layout>
  );
};

export { Home };
