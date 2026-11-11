import React from 'react';

// Libraries
import classNames from 'classnames';

// Three
import { Canvas } from '@/three';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePieceContext } from '@/views/experiments/kinetic-light/song/context';

// Stage
import { Scene } from '@/views/experiments/kinetic-light/stage/scene';

// Styles
import '@/views/experiments/kinetic-light/stage/styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__stage`;

const Picture: React.FunctionComponent = () => {
  const { piece } = usePieceContext();
  const { t } = useTranslation('kinetic-light');

  return (
    <Canvas
      aria-label={t('scene', { title: piece.title })}
      camera={{ far: 400, fov: 50, near: 0.05 }}
      className={classNames(
        CLASS_NAME,
        'kicl-block-size-full',
        'kicl-inline-size-full',
        'kicl-inset-0',
        'kicl-position-absolute'
      )}
      dpr={[1, 2]}
      gl={{ antialias: true }}
      role='img'
    >
      <Scene />
    </Canvas>
  );
};

export { Picture };
