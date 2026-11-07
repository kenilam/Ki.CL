import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Three
import { Canvas } from '@/three';

// Context
import { useStageContext } from '@/views/experiments/kinetic-light/stage/context';

// Partials
import { Scene } from './scene';

// Styles
import './styles.scss';

// Constants
import { CLASS_NAME as VIEW } from '@/views/experiments/kinetic-light/constants';

const CLASS_NAME = `${VIEW}__stage`;

const Stage: React.FunctionComponent = () => {
  const { piece } = useStageContext();
  const { t } = useTranslation('kinetic-light');

  return (
    <Canvas
      aria-label={t('scene', { title: piece.title })}
      camera={{ far: 200, fov: 65, near: 0.1 }}
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

export { Stage };
