import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Layout } from '@/components';

// Partials
import { Background } from './background';
import { Header } from './header';

// Styles
import './styles.scss';

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
