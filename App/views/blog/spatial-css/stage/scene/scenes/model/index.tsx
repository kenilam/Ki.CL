import React from 'react';

// Hooks
import { useSlide } from '@/views/blog/spatial-css/stage/scene/use-slide';

// Partials
import { Ball } from '@/views/blog/spatial-css/stage/scene/parts/ball';
import { Pane } from '@/views/blog/spatial-css/stage/scene/parts/pane';

const Model: React.FunctionComponent = () => {
  const node = useSlide('model');

  return (
    <group ref={node}>
      <group position={[0.5, -0.2, -1.3]} scale={1.1}>
        <Ball kind='satin' />
      </group>
      <group position={[0, 0, 0]}>
        <Pane kind='glass' />
      </group>
    </group>
  );
};

export { Model };
