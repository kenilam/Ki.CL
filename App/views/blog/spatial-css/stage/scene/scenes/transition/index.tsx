import React from 'react';

// Hooks
import { useSlide } from '@/views/blog/spatial-css/stage/scene/use-slide';
import { useGlide } from './use-glide';

// Partials
import { Desk } from '@/views/blog/spatial-css/stage/scene/parts/desk';
import { Mug } from '@/views/blog/spatial-css/stage/scene/parts/mug';

const Transition: React.FunctionComponent = () => {
  const node = useSlide('transition');
  const mug = useGlide();

  return (
    <group ref={node}>
      <group position={[0, -0.6, 0]}>
        <Desk />
        <group position={[0, 0.11, 0.1]} ref={mug}>
          <Mug />
        </group>
      </group>
    </group>
  );
};

export { Transition };
