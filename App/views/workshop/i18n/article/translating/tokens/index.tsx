import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Token } from './token';

// Constants
import { TOKENS } from './constants';

const Tokens: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {TOKENS.map((token) => {
        return <Token token={token} key={token} />;
      })}
    </List>
  );
};

export { Tokens };
