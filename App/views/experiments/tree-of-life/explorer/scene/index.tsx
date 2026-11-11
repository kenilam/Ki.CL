import React from 'react';

// Three
import { Canvas } from '@/three';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useLineageContext } from '@/views/experiments/tree-of-life/lineage-context';

// Partials
import { CameraRig } from './camera-rig';
import { Depth } from './depth';
import { Globe } from './globe';
import { Lights } from './lights';
import { LabelProjector } from './projector';
import { Taxon } from './taxon';

// Constants
import { OPENING_DISTANCE } from '@/views/experiments/tree-of-life/explorer/constants';

const Scene: React.FunctionComponent = () => {
  const { t } = useTranslation('tree-of-life');
  const { chains, rooted } = useLineageContext();

  /*
   * `chains` runs focus → root. Nothing is drawn until it reaches the origin,
   * or the tree would grow from whichever ancestor the climb has got to.
   */
  const root = rooted ? chains[chains.length - 1] : undefined;

  return (
    <Canvas
      aria-label={t('label', { context: 'scene' })}
      role='img'
      camera={{ position: [0, 0, OPENING_DISTANCE], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <Lights />

      <Globe />

      {root ? <Taxon key={root} nodeId={root} /> : null}

      <Depth />

      <LabelProjector />

      <CameraRig />
    </Canvas>
  );
};

export { Scene };
