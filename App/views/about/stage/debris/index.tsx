import React from 'react';

import { useDebris } from './use-debris';

import { COUNT } from './constants';

const Debris: React.FunctionComponent = () => {
  const { geometry, material, mesh } = useDebris();

  return <instancedMesh args={[geometry, material, COUNT]} ref={mesh} />;
};

export { Debris };
