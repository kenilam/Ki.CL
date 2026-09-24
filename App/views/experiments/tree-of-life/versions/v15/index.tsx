import React from 'react';

// Components
import { Frame, Heading } from '@/components';

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

    {/*
     * The labels are placed in the canvas's own coordinates, so they share the
     * framed box with it. The panel and controls are fixed to the window.
     */}
    <Frame>
      <div className='kicl-position-relative'>
        <div
          aria-label='The tree of life around the taxon in view'
          className='kicl-block-size-full kicl-inline-size-full'
          role='img'
        >
          <Scene />
        </div>
        <Labels />
      </div>
    </Frame>

    <Panel />

    <Controls />
  </>
);

export { Canvas };
