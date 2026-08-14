import React from 'react';

// Partials
import Article from './Article';
import Banner from './Banner';
import { Layout } from '@/Components';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--views--experiments--tree-of-life';

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

export default Home;
