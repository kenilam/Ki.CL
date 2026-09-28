import React from 'react';

// Components
import { List, ListItem } from '@/components';

// Partials
import { Bookmark } from './bookmark';
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
    <ListItem>
      <Bookmark />
    </ListItem>
    <ListItem>
      <Share />
    </ListItem>
  </List>
);

export { Actions };
