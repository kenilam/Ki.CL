import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Chain } from './chain';

// Constants
import { CHAINS } from './constants';

const Chains: React.FunctionComponent = () => {
  return (
    <List gap='narrower' listStyleType='disc'>
      {CHAINS.map((context) => {
        return <Chain context={context} key={context} />;
      })}
    </List>
  );
};

export { Chains };
