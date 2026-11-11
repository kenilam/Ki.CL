import React, { Suspense } from 'react';

// Physics
import { Physics } from '@react-three/rapier';

// Three
import { Canvas, Drei } from '@/three';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { Arm } from './arm';
import { Camera } from './camera';
import { Conveyor } from './conveyor';
import { Drop } from './drop';
import { Engine } from './engine';
import { Floor } from './floor';
import { Lights } from './lights';
import { Notice } from './notice';
import { Obstacles } from './obstacles';
import { Overlays } from '@/views/experiments/factory-arm/workspace/stage/overlays';
import { Pallets } from './pallets';
import { Sensing } from './sensors';

const Scene: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');

  return (
    <Canvas
      aria-label={t('scene')}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      role='img'
      shadows='variance'
    >
      <Camera />

      {/*
       * Drag to turn round the cell, scroll or pinch to zoom. A click without a
       * drag still picks a case. It stays above the floor and within a range
       * where the whole cell reads.
       */}
      <Drei.OrbitControls
        dampingFactor={0.08}
        enableDamping
        enablePan={false}
        maxDistance={11}
        maxPolarAngle={Math.PI / 2 - 0.05}
        minDistance={3}
        target={[0, 0.5, 0.4]}
      />

      <Lights />

      {/* Rapier's WASM loads on first use, so the cell waits for it. */}
      <Suspense fallback={null}>
        <Physics>
          <Floor />
          <Pallets />
          <Conveyor />
          <Engine />
          <Obstacles />
          <Drop />
          <Sensing />
        </Physics>
      </Suspense>

      <Arm />
      <Notice />
      <Overlays />
    </Canvas>
  );
};

export { Scene };
