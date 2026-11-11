import React from 'react';

// Helpers
import { tokenColor } from '@/helper';

const Lights: React.FunctionComponent = () => (
  <>
    <ambientLight intensity={0.45} />
    <hemisphereLight
      args={[tokenColor('white-pure'), tokenColor('white-600'), 0.6]}
    />
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
  </>
);

export { Lights };
