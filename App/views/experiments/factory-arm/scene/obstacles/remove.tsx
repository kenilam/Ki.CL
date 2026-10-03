import React from 'react';

// Three
import { Drei } from '@/three';

// Components
import { Button } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

/** How far above the obstacle's top the button floats, clear of its up arrow, in metres. */
const ABOVE = 0.4;

type Props = { id: string; size: [number, number, number] };

/**
 * A button over the selected obstacle that takes it out of the cell, as the
 * Delete key does.
 */
const Remove: React.FunctionComponent<Props> = ({ id, size }) => {
  const { select, write } = useFactoryArmContext();

  return (
    <Drei.Html center position={[0, size[1] / 2 + ABOVE, 0]}>
      <Button
        onClick={() => {
          select(null);
          write.withdraw(id);
        }}
        variant='secondary'
      >
        <Ri.RiDeleteBinLine aria-hidden />
        <span className='kicl-hidden'>{COPY.panel.shapes.remove}</span>
      </Button>
    </Drei.Html>
  );
};

export { Remove };
