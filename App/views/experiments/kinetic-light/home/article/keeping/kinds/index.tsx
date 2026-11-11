import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Kind } from './kind';

// Constants
import { KINDS } from './constants';

const Kinds: React.FunctionComponent = () => {
  return (
    <List gap='narrow' listStyleType='disc'>
      {KINDS.map((context) => {
        return <Kind context={context} key={context} />;
      })}
    </List>
  );
};

export { Kinds };
