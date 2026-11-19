import React from 'react';

// Hooks
import { useSlide } from '@/views/blog/spatial-css/stage/scene/use-slide';

// Partials
import { Desk } from '@/views/blog/spatial-css/stage/scene/parts/desk';
import { Frame } from '@/views/blog/spatial-css/stage/scene/parts/frame';
import { Lamp } from '@/views/blog/spatial-css/stage/scene/parts/lamp';
import { Mug } from '@/views/blog/spatial-css/stage/scene/parts/mug';

const Portal: React.FunctionComponent = () => {
  const node = useSlide('portal');

  return (
    <group ref={node}>
      <group position={[0, -0.95, -0.1]}>
        <Desk />
      </group>
      <group position={[-0.95, -0.84, -0.4]}>
        <Lamp />
      </group>
      <group position={[0.95, -0.84, 0.25]}>
        <Mug />
      </group>
      <group position={[0, -0.1, 1.1]} scale={1.5}>
        <Frame />
      </group>
    </group>
  );
};

export { Portal };
