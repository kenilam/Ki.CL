import React from 'react';

// Components
import { Heading, Layout } from '@/components';

// Labels
import { Labels } from './labels';

// Partials
import { Controls } from './controls';
import { Panel } from './panel';
import { Scene } from './scene';

// Styles
import './styles.scss';

/*
 * The page's `h1` is the experiment's name, hidden, rather than the focused
 * taxon's: the taxon's title is missing until the lineage resolves and sits
 * inside a disclosure, so it stays an `h2` under this.
 */
const Canvas: React.FunctionComponent = () => (
  <>
    <Heading is='h1' className='kicl-hidden'>
      Tree of Life
    </Heading>

    <Layout fullScreen>
      <div role='img' aria-label='The tree of life around the taxon in view'>
        <Scene />
      </div>
    </Layout>

    <Labels />

    <Panel />

    <Controls />
  </>
);

export { Canvas };
