import React from 'react';

import { useFormContext } from 'react-hook-form';

// Components
import { Button, List, ListItem } from 'design/components';

// Views
import { RootError } from '@/views/root-error';

// Constants
import { COPY, DELETE_ID } from '@/views/me/profile/constants';

// Schema
import type { DeleteValues } from './schema';

/** The API's error, then cancel and delete. */
const Actions: React.FunctionComponent = () => {
  const {
    formState: { isSubmitting },
  } = useFormContext<DeleteValues>();

  return (
    <>
      <RootError />
      <List
        autoFlow='column'
        className='kicl-padding-block-start'
        justifyContent='center'
      >
        <ListItem>
          <Button
            command='request-close'
            commandFor={DELETE_ID}
            disabled={isSubmitting}
            size='small'
            type='button'
            variant='ghost'
          >
            {COPY.cancel}
          </Button>
        </ListItem>
        <ListItem>
          <Button
            disabled={isSubmitting}
            level='error'
            size='small'
            type='submit'
            variant='secondary'
          >
            {COPY.delete}
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export { Actions };
