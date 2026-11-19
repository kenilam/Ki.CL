import React from 'react';

// Three
import { Drei } from '@/three';

// Hooks
import { useColours } from '@/views/blog/spatial-css/stage/scene/use-colours';

const Studio: React.FunctionComponent = () => {
  const { rims } = useColours();

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        castShadow
        intensity={1.7}
        position={[-4, 8, 6]}
        shadow-bias={-0.0005}
        shadow-camera-bottom={-6}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-mapSize={[2048, 2048]}
        shadow-normalBias={0.03}
      />
      <directionalLight color={rims.back} intensity={4} position={[6, 3, -5]} />
      <directionalLight
        color={rims.side}
        intensity={3.6}
        position={[-7, 2, -3]}
      />
      <directionalLight
        color={rims.under}
        intensity={1.6}
        position={[0, -6, 4]}
      />
      <Drei.Environment environmentIntensity={0.85} frames={1} resolution={512}>
        <Drei.Lightformer
          form='rect'
          intensity={6}
          position={[0, 6, 2]}
          rotation-x={Math.PI / 2}
          scale={[8, 2, 1]}
        />
        <Drei.Lightformer
          form='rect'
          intensity={3}
          position={[-6, 1, 2]}
          rotation-y={Math.PI / 2}
          scale={[3, 8, 1]}
        />
        <Drei.Lightformer
          form='rect'
          intensity={1.5}
          position={[6, 1, 2]}
          rotation-y={-Math.PI / 2}
          scale={[3, 8, 1]}
        />
        <Drei.Lightformer
          form='rect'
          intensity={4}
          position={[0, 3, -6]}
          scale={[10, 0.6, 1]}
        />
        <Drei.Lightformer
          form='ring'
          intensity={3}
          position={[3, 3, 8]}
          scale={2.5}
        />
        <Drei.Lightformer
          form='rect'
          intensity={0.12}
          position={[0, 0, 10]}
          rotation-y={Math.PI}
          scale={[20, 12, 1]}
        />
        <Drei.Lightformer
          form='rect'
          intensity={4}
          position={[-8, 1, 5]}
          scale={[0.5, 12, 1]}
        />
        <Drei.Lightformer
          form='rect'
          intensity={4}
          position={[-4, 1, 8.5]}
          scale={[0.6, 12, 1]}
        />
        <Drei.Lightformer
          form='rect'
          intensity={4}
          position={[6, 1, 7]}
          scale={[0.8, 12, 1]}
        />
      </Drei.Environment>
    </>
  );
};

export { Studio };
