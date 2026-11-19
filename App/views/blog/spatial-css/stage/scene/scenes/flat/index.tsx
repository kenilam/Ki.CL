import React from 'react';

// Hooks
import { useSlide } from '@/views/blog/spatial-css/stage/scene/use-slide';

// Partials
import { Ball } from '@/views/blog/spatial-css/stage/scene/parts/ball';
import { Print } from '@/views/blog/spatial-css/stage/scene/parts/print';
import { Sheet } from '@/views/blog/spatial-css/stage/scene/parts/sheet';

const LIE = 0.55;

const Flat: React.FunctionComponent = () => {
  const node = useSlide('flat');

  return (
    <group ref={node}>
      <group rotation={[LIE, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <Sheet />
        </group>
        <group position={[-1, 0.1, 0]}>
          <Print />
        </group>
        <group position={[1, 0.65, 0]}>
          <Ball kind='satin' />
        </group>
      </group>
    </group>
  );
};

export { Flat };
