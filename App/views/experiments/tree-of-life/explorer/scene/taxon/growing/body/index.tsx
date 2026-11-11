import React from 'react';

// Context
import { useTaxonContext } from '@/views/experiments/tree-of-life/explorer/scene/taxon/context';

// Hooks
import { usePointer } from './use-pointer';

const Body: React.FunctionComponent = () => {
  const { body, color, refs } = useTaxonContext();
  const pointer = usePointer();

  return (
    <mesh
      ref={refs.body}
      geometry={body}
      onClick={pointer.onClick}
      onPointerOver={pointer.onPointerOver}
      onPointerOut={pointer.onPointerOut}
    >
      <meshLambertMaterial color={color} />
    </mesh>
  );
};

export { Body };
