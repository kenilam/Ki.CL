import React from 'react';

// Overlays
import { toAnchor } from '@/views/experiments/factory-arm/workspace/stage/overlays';

// Partials
import { useSize } from '@/views/experiments/factory-arm/workspace/stage/scene/obstacles/obstacle/use-size';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

/** How far above the obstacle's top the button floats, clear of its up arrow, in metres. */
const ABOVE = 0.4;

type Props = Pick<Solid, 'id'>;

/** Where the button that takes the selected obstacle out of the cell floats. */
const Remove: React.FunctionComponent<Props> = ({ id }) => {
  const size = useSize(id);

  return (
    <group position={[0, size[1] / 2 + ABOVE, 0]} ref={toAnchor('remove')} />
  );
};

export { Remove };
