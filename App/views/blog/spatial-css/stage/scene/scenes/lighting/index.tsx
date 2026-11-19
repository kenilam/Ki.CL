import React from 'react';

// Hooks
import { useSlide } from '@/views/blog/spatial-css/stage/scene/use-slide';
import { useCircle } from './use-circle';

// Partials
import { Ball } from '@/views/blog/spatial-css/stage/scene/parts/ball';
import { Bulb } from './bulb';

const Lighting: React.FunctionComponent = () => {
  const node = useSlide('lighting');
  const light = useCircle();

  return (
    <group ref={node}>
      <group scale={2.4}>
        <Ball kind='chrome' />
      </group>
      <group ref={light}>
        <Bulb />
      </group>
    </group>
  );
};

export { Lighting };
