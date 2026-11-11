import React from 'react';

// Partials
import { Copy } from './copy';

// Constants
import { ROUNDS } from './constants';

const Copies: React.FunctionComponent = () => {
  return (
    <group>
      {ROUNDS.map((round) => {
        return <Copy key={round} round={round} />;
      })}
    </group>
  );
};

export { Copies };
