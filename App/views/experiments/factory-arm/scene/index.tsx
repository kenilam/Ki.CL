import React, { Suspense } from 'react';

// Physics
import { Physics } from '@react-three/rapier';

// Three
import { Drei, Fiber } from '@/three';

// Partials
import { Arm } from './arm';
import { Camera } from './camera';
import { Boxes } from './boxes';
import { Conveyor } from './conveyor';
import { Floor } from './floor';
import { Grasp } from './grasp';
import { Notice } from './notice';
import { Obstacles } from './obstacles';
import { Pallet } from './pallet';
import { Sensing } from './sensors';

// Constants
import { BUFFER, PALLET } from './constants';

const Scene: React.FunctionComponent = () => (
  <Fiber.Canvas
    dpr={[1, 2]}
    gl={{ antialias: true, alpha: true }}
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

    <ambientLight intensity={0.45} />
    <hemisphereLight args={['#ffffff', '#d8d2c4', 0.6]} />
    {/*
     * The key light casts the shadows; its box covers the whole cell. Variance
     * shadow maps blur by `radius`: Drei's SoftShadows no longer compiles
     * against this three.js.
     */}
    <directionalLight
      castShadow
      intensity={1.6}
      position={[4, 8, 5]}
      shadow-bias={-0.0004}
      shadow-blurSamples={16}
      shadow-camera-bottom={-5}
      shadow-camera-far={20}
      shadow-camera-left={-5}
      shadow-camera-right={5}
      shadow-camera-top={5}
      shadow-mapSize={[2048, 2048]}
      shadow-normalBias={0.02}
      shadow-radius={8}
    />
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

    <Arm />
    <Notice />
  </Fiber.Canvas>
);

export { Scene };
