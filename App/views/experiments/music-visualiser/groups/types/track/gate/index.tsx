import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Layout } from 'design/components';

// Partials
import { Attribution } from './attribution';
import { Header } from './header';
import { Play } from './play';
import { Source } from './source';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/music-visualiser/constants';

const CLASS_NAME = `${VIEW}__gate`;

/**
 * A track's gate: its title, where it is from, and a link to its `/play`.
 * The press on that link is the gesture the browser needs before audio.
 */
const Gate: React.FunctionComponent = () => {
  return (
    <Layout
      alignContent='center'
      alignItems='center'
      autoFlow='row'
      gap='none'
      justifyContent='center'
      justifyItems='center'
    >
      <section
        className={classNames(
          CLASS_NAME,
          'kicl-inset-0',
          'kicl-margin-inline-auto',
          'kicl-max-inline-size-columns-6',
          'kicl-padding-block-end-frame',
          'kicl-padding-block-start-header',
          'kicl-padding-inline-frame',
          'kicl-position-absolute',
          'kicl-text-align-center'
        )}
      >
        <Header />
        <Source />
        <Attribution />
        <Play />
      </section>
    </Layout>
  );
};

export { Gate };
