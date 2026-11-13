import React from 'react';

import classNames from 'classnames';

import { useResponsive } from 'design/hooks';

import { Canvas } from '@/three';

import { Effects } from './effects';
import { Pause } from './pause';
import { Studio } from './studio';
import { Voxels } from './voxels';

import { CLASS_NAME } from './constants';

const Mark: React.FunctionComponent = () => {
  const { prefersReducedMotion: still } = useResponsive();

  return (
    <div
      aria-hidden
      className={classNames(
        CLASS_NAME,
        'kicl-aspect-ratio-square',
        'kicl-display-block',
        'kicl-inline-size-full',
        'kicl-margin-inline-auto',
        'kicl-max-inline-size-columns-3',
        'kicl-position-relative'
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
        dpr={[1, 2]}
        frameloop={still ? 'demand' : 'always'}
        gl={{ antialias: true }}
        shadows
      >
        <Studio />
        <Voxels />
        <Effects />
        <Pause />
      </Canvas>
    </div>
  );
};

export { Mark };
