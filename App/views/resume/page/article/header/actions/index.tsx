import React from 'react';

// Components
import { List } from 'design/components';

// Partials
import { File } from './file';
import { Message } from './message';
import { Print } from './print';

/** None of these controls belongs on paper. */
const Actions: React.FunctionComponent = () => {
  return (
    <List
      alignItems='center'
      autoFlow='column'
      className='kicl-print-hidden'
      gap='narrow'
      justifyContent='start'
      justifyItems='start'
    >
      <Message />
      <File />
      <Print />
    </List>
  );
};

export { Actions };
