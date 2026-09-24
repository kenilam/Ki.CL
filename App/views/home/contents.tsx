import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Frame, Layout } from '@/components';

// Partials
import { Background } from './background';
import { Header } from './header';

// Styles
import './styles.scss';

// Constants
import { CONTENT_DELAY, FRAME_DELAY } from './constants';

const CLASS_NAME = 'kicl--views--home';

const Home: React.FunctionComponent = () => {
  return (
    <Layout
      autoFlow='row'
      gap='none'
      justifyContent='center'
      justifyItems='center'
    >
      <Frame delay={FRAME_DELAY}>
        <section className={classNames(CLASS_NAME, 'kicl-position-relative')}>
          <Animation delay={CONTENT_DELAY}>
            <Background />
          </Animation>
          <Header />
        </section>
      </Frame>
    </Layout>
  );
};

export { Home };
