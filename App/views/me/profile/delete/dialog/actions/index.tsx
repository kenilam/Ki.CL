import React from 'react';

// Components
import { FormMessage, List } from 'design/components';

// Partials
import { Cancel } from './cancel';
import { Submit } from './submit';

/** The API's error, then cancel and delete. */
const Actions: React.FunctionComponent = () => {
  return (
    <>
      <FormMessage name='root' />
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
