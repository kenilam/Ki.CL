import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Animation, Layout } from 'design/components';

// Partials
import { Posts } from './posts';
import { Title } from './title';

// Constants
import { CONTENT_DELAY } from '@/views/constants';
import { CLASS_NAME, TITLE_ID } from './constants';

const Home: React.FunctionComponent = () => {
  return (
    <Animation delay={CONTENT_DELAY}>
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
          <Posts />
        </section>
      </Layout>
    </Animation>
  );
};

export { Home };
