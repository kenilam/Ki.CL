import React from 'react';

// Three
import { Fiber } from '@/three';

// Context
import { useTreeOfLifeContext } from '@/views/experiments/tree-of-life/context';

// Camera
import { CameraRig } from './camera-rig';

// Globe
import { Globe } from './globe';

// Depth
import { Depth } from './depth';

// Labels
import { LabelProjector } from './labels';

// Taxon
import { Taxon } from './taxon';

// Constants
import {
  ORIGIN,
  ROOT_COLOR,
  OPENING_DISTANCE,
  TRUNK_SIZE,
  TRUNK_WIDTH,
  WIDTH_TAPER,
} from './constants';

const Scene: React.FunctionComponent = () => {
  const { chains, rooted } = useTreeOfLifeContext();

  /*
   * `chains` runs focus → root, so the last entry is where the tree starts.
   * Nothing is drawn until it actually reaches the origin: the climb takes
   * several fetches, and the outermost node known before it lands is not the
   * root - planting on it would grow the tree from the wrong centre.
   */
  const root = rooted ? chains[chains.length - 1] : undefined;

  return (
    <Fiber.Canvas
      camera={{ position: [0, 0, OPENING_DISTANCE], fov: 50 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.88} />
      <hemisphereLight args={['#ffffff', '#cfdcd5', 0.46]} />
      <directionalLight position={[4, 8, 6]} intensity={0.19} />
      <directionalLight
        position={[-6, -3, -5]}
        intensity={0.1}
        color='#dcefe6'
      />

      <Globe />

      {root ? (
        <Taxon
          key={root}
          nodeId={root}
          start={ORIGIN}
          startColor={ROOT_COLOR}
          startWidth={TRUNK_WIDTH}
          endWidth={TRUNK_WIDTH * WIDTH_TAPER}
          size={TRUNK_SIZE}
          play='enter'
        />
      ) : null}

      <Depth />

      <LabelProjector />

      <CameraRig />
    </Fiber.Canvas>
  );
};

export { Scene };
