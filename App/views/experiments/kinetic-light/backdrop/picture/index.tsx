import React from 'react';

// Libraries
import classNames from 'classnames';

// Three
import { Canvas } from '@/three';

// Stage
import { Scene } from '@/views/experiments/kinetic-light/stage/scene';

// Styles
import '@/views/experiments/kinetic-light/stage/styles.scss';

// Hooks
import { useResponsive } from 'design/hooks';

// Partials
import { Lens } from './lens';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__backdrop`;

const Picture: React.FunctionComponent = () => {
  const { prefersReducedMotion: still } = useResponsive();

  return (
    <Canvas
      aria-hidden
      camera={{ far: 400, fov: 50, near: 0.05 }}
      className={classNames(
        CLASS_NAME,
        'kicl-block-size-full',
        'kicl-inline-size-full',
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-absolute'
      )}
      dpr={[1, 2]}
      frameloop={still ? 'demand' : 'always'}
      gl={{ antialias: true }}
    >
      <Lens />
      <Scene />
    </Canvas>
  );
};

export { Picture };
