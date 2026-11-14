import React from 'react';

import { Drei } from '@/three';

import { useMark } from '@/views/mark/context';

const Studio: React.FunctionComponent = () => {
  const { light } = useMark();

  return (
    <>
      <ambientLight intensity={light.ambient} />
      <directionalLight
        castShadow
        intensity={light.key}
        position={[-3, 9, 5]}
        shadow-bias={-0.0005}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-mapSize={[1024, 1024]}
        shadow-normalBias={0.03}
      />
      <Drei.Environment
        environmentIntensity={light.environment}
        frames={1}
        resolution={256}
      >
        <Drei.Lightformer
          form='rect'
          intensity={5}
          position={[0, 6, 2]}
          rotation-x={Math.PI / 2}
          scale={[12, 4, 1]}
        />
        <Drei.Lightformer
          form='rect'
          intensity={0.6}
          position={[-6, 0, 3]}
          rotation-y={Math.PI / 2}
          scale={[10, 3, 1]}
        />
        <Drei.Lightformer
          form='rect'
          intensity={0.6}
          position={[6, 0, 3]}
          rotation-y={-Math.PI / 2}
          scale={[10, 3, 1]}
        />
        <Drei.Lightformer
          form='rect'
          intensity={3}
          position={[0, 4, -6]}
          scale={[10, 1, 1]}
        />
        <Drei.Lightformer
          form='ring'
          intensity={2}
          position={[3, 3, 8]}
          scale={3}
        />
      </Drei.Environment>
    </>
  );
};

export { Studio };
