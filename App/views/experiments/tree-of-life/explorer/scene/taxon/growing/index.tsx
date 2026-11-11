import React from 'react';

// Partials
import { Aura } from './aura';
import { Body } from './body';
import { Branch } from './branch';
import { Descendants } from './descendants';

const Growing: React.FunctionComponent = () => {
  return (
    <group>
      <Branch />
      <Body />
      <Aura />
      <Descendants />
    </group>
  );
};

export { Growing };
