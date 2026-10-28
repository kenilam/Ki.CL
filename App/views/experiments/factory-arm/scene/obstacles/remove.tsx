import React from 'react';

// Overlays
import { toAnchor } from '@/views/experiments/factory-arm/scene/overlays';

/** How far above the obstacle's top the button floats, clear of its up arrow, in metres. */
const ABOVE = 0.4;

type Props = { size: [number, number, number] };

/** Where the button that takes the selected obstacle out of the cell floats. */
const Remove: React.FunctionComponent<Props> = ({ size }) => (
  <group position={[0, size[1] / 2 + ABOVE, 0]} ref={toAnchor('remove')} />
);

export { Remove };
