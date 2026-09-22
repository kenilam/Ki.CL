import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Layout } from '@/Components';

// Partials
import { Background } from './Background';
import { Header } from './Header';

// Styles
import './Styles.scss';

const CLASS_NAME = 'kicl--views--home';

const Home: React.FunctionComponent = () => {
  return (
    <Animation delay={300}>
      <Layout
        autoFlow='row'
        gap='none'
        justifyContent='center'
        justifyItems='center'
      >
        <section className={classNames(CLASS_NAME, 'kicl-position-relative')}>
          <Background />
          <Header />
        </section>
      </Layout>
    </Animation>
  );
};

export { Home };
