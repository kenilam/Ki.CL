import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { Share } from './share';

const Actions: React.FunctionComponent = () => (
  <List
    alignContent='center'
    alignItems='center'
    autoFlow='column'
    gap='narrow'
    justifyItems='center'
    justifyContent='center'
  >
    <Share />
  </List>
);

export { Actions };
