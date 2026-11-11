import React from 'react';

// Components
import { List } from 'design/components';

// Views
import { RootError } from '@/views/root-error';

// Partials
import { Cancel } from './cancel';
import { Submit } from './submit';

/** The API's error, then cancel and delete. */
const Actions: React.FunctionComponent = () => {
  return (
    <>
      <RootError />
      <List
        autoFlow='column'
        className='kicl-padding-block-start'
        justifyContent='center'
      >
        <Cancel />
        <Submit />
      </List>
    </>
  );
};

export { Actions };
