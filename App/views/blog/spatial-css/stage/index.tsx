import React from 'react';

// Libraries
import classNames from 'classnames';

// Hooks
import { useResponsive } from 'design/hooks';

// Three
import { Canvas } from '@/three';

// Partials
import { Scene } from './scene';

// Constants
import { CLASS_NAME as ROOT } from '@/views/blog/spatial-css/constants';

const CLASS_NAME = `${ROOT}__stage`;

const Stage: React.FunctionComponent = () => {
  const { prefersReducedMotion: still } = useResponsive();

  return (
    <div
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-background-color-body',
        'kicl-inset-0',
        'kicl-pointer-events-none',
        'kicl-position-fixed',
        'kicl-print-hidden'
      )}
    >
      <Canvas
        camera={{ fov: 30, position: [0, 0, 19] }}
        className={classNames(
          'kicl-block-size-full',
          'kicl-inline-size-full',
          'kicl-inset-0',
          'kicl-position-absolute'
        )}
        dpr={[1, 1.25]}
        frameloop={still ? 'demand' : 'always'}
        gl={{ antialias: true }}
        shadows
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export { Stage };
