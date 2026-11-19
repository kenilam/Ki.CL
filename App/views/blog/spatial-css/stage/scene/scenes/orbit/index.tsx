import React from 'react';

// Hooks
import { useSlide } from '@/views/blog/spatial-css/stage/scene/use-slide';
import { useSpin } from './use-spin';

// Partials
import { Ball } from '@/views/blog/spatial-css/stage/scene/parts/ball';
import { Pane } from '@/views/blog/spatial-css/stage/scene/parts/pane';
import { Sheet } from '@/views/blog/spatial-css/stage/scene/parts/sheet';

const Orbit: React.FunctionComponent = () => {
  const node = useSlide('orbit');
  const turn = useSpin();

  return (
    <group ref={node}>
      <group ref={turn}>
        <group position={[0, 0, -1.4]}>
          <Pane kind='paper' />
        </group>
        <group position={[0, 0, 0]}>
          <Sheet />
        </group>
        <group position={[0.6, -0.3, 0.7]} scale={0.9}>
          <Ball kind='satin' />
        </group>
        <group position={[0, 0, 1.4]}>
          <Pane kind='glass' />
        </group>
      </group>
    </group>
  );
};

export { Orbit };
