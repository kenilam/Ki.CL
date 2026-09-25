import React, { Suspense } from 'react';

// Physics
import { Physics } from '@react-three/rapier';

// Three
import { Drei, Fiber } from '@/three';

// Partials
import { Arm } from './arm';
import { Boxes } from './boxes';
import { Conveyor } from './conveyor';
import { Floor } from './floor';
import { Grasp } from './grasp';
import { Obstacles } from './obstacles';
import { Pallet } from './pallet';
import { Sensing } from './sensors';

// Constants
import { BUFFER, PALLET } from './constants';

const Scene: React.FunctionComponent = () => (
  <Fiber.Canvas
    camera={{ position: [0.6, 4.2, 5.6], fov: 42 }}
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true }}
  >
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

    <ambientLight intensity={0.45} />
    <hemisphereLight args={['#ffffff', '#d8d2c4', 0.6]} />
    <directionalLight position={[4, 8, 5]} intensity={1.6} />
    <directionalLight position={[-5, 3, -4]} intensity={0.4} />

    {/* Rapier's WASM loads on first use, so the cell waits for it. */}
    <Suspense fallback={null}>
      <Physics>
        <Floor />
        <Pallet position={PALLET.position} />
        <Pallet position={BUFFER.position} />
        <Conveyor />
        <Boxes />
        <Obstacles />
        <Sensing />
        <Grasp />
      </Physics>
    </Suspense>

    <Drei.ContactShadows
      blur={2.4}
      far={3}
      opacity={0.45}
      position-y={0.001}
      scale={8}
    />
    <Arm />
  </Fiber.Canvas>
);

export { Scene };
