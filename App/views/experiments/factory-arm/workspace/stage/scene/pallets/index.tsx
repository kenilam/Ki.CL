import React from 'react';

// Context
import { useAppliedContext } from '@/views/experiments/factory-arm/applied-context';

// Partials
import { Pallet } from './pallet';

// Constants
import {
  BUFFER,
  INCOMING,
} from '@/views/experiments/factory-arm/engine/layout';

/** The pallets the stacks come in on, one for each stack, and the buffer pallet. */
const Pallets: React.FunctionComponent = () => {
  const { applied } = useAppliedContext();

  return (
    <>
      {INCOMING.slice(0, applied.stacks).map((position) => {
        return <Pallet key={position.join()} position={position} />;
      })}
      <Pallet position={BUFFER.position} />
    </>
  );
};

export { Pallets };
