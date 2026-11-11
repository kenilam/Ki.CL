import React from 'react';

// Three
import type { Fiber } from '@/three';

// Context
import { useSelectionContext } from '@/views/experiments/factory-arm/workspace/selection-context';

// Partials
import { useGlow } from '@/views/experiments/factory-arm/workspace/stage/scene/obstacles/obstacle/use-glow';
import { useSize } from '@/views/experiments/factory-arm/workspace/stage/scene/obstacles/obstacle/use-size';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

// Constants
import { DRAG } from '@/views/experiments/factory-arm/engine/layout';

type Props = Pick<Solid, 'id'>;

/** The obstacle as drawn. Clicking it selects it, or lets go of it when it's selected. */
const Block: React.FunctionComponent<Props> = ({ id }) => {
  const { select, selected } = useSelectionContext();
  const material = useGlow(id);
  const size = useSize(id);

  const pick = (event: Fiber.ThreeEvent<MouseEvent>) => {
    event.stopPropagation();

    // A drag to turn the view that ends on it isn't a click on it.
    if (event.delta <= DRAG) {
      select(selected === id ? null : id);
    }
  };

  return (
    <mesh
      castShadow
      material={material}
      onClick={pick}
      onPointerOut={() => (document.body.style.cursor = '')}
      onPointerOver={(event) => {
        event.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      receiveShadow
    >
      <boxGeometry args={size} />
    </mesh>
  );
};

export { Block };
