/* eslint-disable react/no-unknown-property */
import React from 'react';

// Three
import { Canvas } from '@/Three';

// Fish
import Ball from './Ball';
import Shadow from './Shadow';

// Styles
import './styles.scss';

const WebGL: React.FunctionComponent = () => {
  return (
    <Canvas
      camera={{ position: [0, -5, 5] }}
      className='kicl--view--works--rolling-ball--web-gl'
      shadows
    >
      <ambientLight intensity={0.5} />
      <spotLight
        angle={0.2}
        castShadow
        intensity={0.6}
        penumbra={1}
        position={[20, 10, 10]}
        shadowMapHeight={2048}
        shadowMapWidth={2048}
      />
      <Shadow />
      <Ball />
    </Canvas>
  );
};

export default WebGL;
