import React from 'react';

// Three
import { Drei } from '@/three';

// Components
import { Button } from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import type { Target } from './drag';

// Constants
import { COPY } from '@/views/experiments/factory-arm/floor/constants';

type Props = Target & { position: [number, number, number] };

/** A button floating over what is chosen, to take it off the floor. */
const Remove: React.FunctionComponent<Props> = ({ id, kind, position }) => {
  const { takeOff } = useHub();

  return (
    <Drei.Html center position={position}>
      <Button
        level='error'
        onClick={() => takeOff({ kind, id })}
        variant='ghost'
      >
        <Ri.RiDeleteBinLine />
        <span className='kicl-hidden'>{COPY.panel.remove}</span>
      </Button>
    </Drei.Html>
  );
};

export { Remove };
