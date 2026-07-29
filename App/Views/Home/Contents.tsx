import React from 'react';

// Components
import { Animation, Layout } from '@/Components';

// Partials
import Header from './Header';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--views--home';

const Home: React.FunctionComponent = () => {
  return (
    <Animation animationDelay={300}>
      <Layout
        autoFlow='row'
        gap='none'
        justifyContent='center'
        justifyItems='center'
      >
        <section className={CLASS_NAME}>
          <Header />
        </section>
      </Layout>
    </Animation>
  );
};

export default Home;
