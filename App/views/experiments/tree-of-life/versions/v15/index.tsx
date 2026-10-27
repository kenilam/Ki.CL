import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Frame, Heading } from 'design/components';

// Routes
import { Outlet } from 'design/router';

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
 * in the details dialog, so it stays an `h2` under this.
 */
const Canvas: React.FunctionComponent = () => {
  const { t: common } = useTranslation();

  return (
    <>
      <Heading is='h1' className='kicl-hidden'>
        {common('experiment', { context: 'tree_of_life' })}
      </Heading>

      {/*
       * The labels are placed in the canvas's own coordinates, so they share the
       * framed box with it. The panel and controls are fixed to the window.
       */}
      <Frame>
        <figure className='kicl-position-relative'>
          <Scene />
          <Labels />
        </figure>
      </Frame>

      <Panel />

      <Controls />

      {/* The taxon's details, when the route asks for them. */}
      <Outlet />
    </>
  );
};

export { Canvas };
