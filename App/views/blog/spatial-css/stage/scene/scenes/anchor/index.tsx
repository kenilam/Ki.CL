import React from 'react';

// Hooks
import { useSlide } from '@/views/blog/spatial-css/stage/scene/use-slide';
import { useSway } from './use-sway';

// Partials
import { Desk } from '@/views/blog/spatial-css/stage/scene/parts/desk';
import { Lamp } from '@/views/blog/spatial-css/stage/scene/parts/lamp';
import { Mug } from '@/views/blog/spatial-css/stage/scene/parts/mug';
import { Spot } from '@/views/blog/spatial-css/stage/scene/parts/spot';

const Anchor: React.FunctionComponent = () => {
  const node = useSlide('anchor');
  const desk = useSway();

  return (
    <group ref={node}>
      <group position={[0, -0.6, 0]} ref={desk}>
        <Desk />
        <group position={[-0.75, 0.11, 0]}>
          <Spot />
          <Lamp />
        </group>
        <group position={[0.95, 0.11, 0.2]}>
          <Mug />
        </group>
      </group>
    </group>
  );
};

export { Anchor };
