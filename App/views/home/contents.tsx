import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Frame, Layout } from 'design/components';

// Widgets
import { Background } from 'design/widgets';

// Partials
import { Header } from './header';

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
