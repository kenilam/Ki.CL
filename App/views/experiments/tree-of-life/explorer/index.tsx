import React from 'react';

// Components
import { Frame, Heading } from 'design/components';

// Routes
import { Outlet } from 'design/router';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Back } from './back';
import { Controls } from './controls';
import { Labels } from './labels';
import { Panel } from './panel';
import { Scene } from './scene';

// The `h1` is the experiment's name: the taxon's title is missing until the lineage resolves.
const Canvas: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <>
      <Heading is='h1' className='kicl-hidden'>
        {t('experiment', { context: 'tree_of_life' })}
      </Heading>

      {/* The labels are placed in the canvas's own coordinates, so they share its box. */}
      <Frame>
        <figure className='kicl-position-relative'>
          <Scene />
          <Labels />
        </figure>
      </Frame>

      <Panel />

      <Controls />

      <Back />

      <Outlet />
    </>
  );
};

export { Canvas };
