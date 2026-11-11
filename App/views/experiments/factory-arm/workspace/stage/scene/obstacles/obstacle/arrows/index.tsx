import React from 'react';

// Partials
import { Arrow } from './arrow';

// Spec
import type { Solid } from '@/views/experiments/factory-arm/engine/solid';

// Constants
import { WAYS } from './ways';

type Props = Pick<Solid, 'id'>;

/**
 * Triangles round the selected obstacle, one each way it can move: those
 * along the floor lie flat round its base, up and down stand over and under
 * it. Clicking one moves it a step that way, as its key does.
 */
const Arrows: React.FunctionComponent<Props> = ({ id }) => {
  return (
    <>
      {WAYS.map(({ axis }) => {
        return <Arrow axis={axis} id={id} key={axis} />;
      })}
    </>
  );
};

export { Arrows };
