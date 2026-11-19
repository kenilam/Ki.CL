import React from 'react';

// Hooks
import { useSlide } from '@/views/blog/spatial-css/stage/scene/use-slide';
import { useNear } from './use-near';

// Partials
import { Desk } from '@/views/blog/spatial-css/stage/scene/parts/desk';
import { Frame } from '@/views/blog/spatial-css/stage/scene/parts/frame';
import { Lamp } from '@/views/blog/spatial-css/stage/scene/parts/lamp';
import { Mug } from '@/views/blog/spatial-css/stage/scene/parts/mug';

const Room: React.FunctionComponent = () => {
  const node = useSlide('room');
  const near = useNear();

  return (
    <group ref={node}>
      <group scale={1.3}>
        <Frame />
      </group>
      <group ref={near}>
        <group position={[0, -0.95, 0]}>
          <Desk />
        </group>
        <group position={[-1, -0.84, -0.2]}>
          <Lamp />
        </group>
        <group position={[1, -0.84, 0.3]}>
          <Mug />
        </group>
      </group>
    </group>
  );
};

export { Room };
