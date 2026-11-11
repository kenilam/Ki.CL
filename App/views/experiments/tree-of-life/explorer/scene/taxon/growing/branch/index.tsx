import React from 'react';

import { THREE } from '@/three';

// Context
import { useTaxonContext } from '@/views/experiments/tree-of-life/explorer/scene/taxon/context';

const Branch: React.FunctionComponent = () => {
  const { branch, refs } = useTaxonContext();

  if (!branch) {
    return null;
  }

  return (
    <mesh ref={refs.branch} geometry={branch.geometry}>
      <meshLambertMaterial vertexColors side={THREE.DoubleSide} />
    </mesh>
  );
};

export { Branch };
