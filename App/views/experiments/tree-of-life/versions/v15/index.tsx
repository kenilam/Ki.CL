import React from 'react';

// Components
import { Layout } from '@/components';

// Labels
import { Labels } from './labels';

// Partials
import { Controls } from './controls';
import { Panel } from './panel';
import { Scene } from './scene';

// Styles
import './styles.scss';

const Canvas: React.FunctionComponent = () => (
  <>
    <Layout fullScreen>
      <div>
        <Scene />
      </div>
    </Layout>

    <Labels />

    <Panel />

    <Controls />
  </>
);

export { Canvas };
