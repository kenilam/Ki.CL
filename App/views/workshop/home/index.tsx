import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Layout } from 'design/components';

// Partials
import { Title } from './title';
import { Topics } from './topics';

// Constants
import { CLASS_NAME, TITLE_ID } from './constants';

/** The workshop index. */
const Home: React.FunctionComponent = () => {
  return (
    <Animation delay={1000}>
      <Layout autoFlow='row' gap='normal'>
        <section
          aria-labelledby={TITLE_ID}
          className={classNames(
            CLASS_NAME,
            'kicl-inline-size-full',
            'kicl-padding-block-extreme',
            'kicl-padding-inline-frame-columns-12'
          )}
        >
          <Title />
          <Topics />
        </section>
      </Layout>
    </Animation>
  );
};

export { Home };
