import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import { Button, List, ListItem } from 'design/components';

// Views
import { RootError } from '@/views/root-error';

// Constants
import { DELETE_ID } from '@/views/me/profile/constants';

// Schema
import type { DeleteValues } from './schema';

/** The API's error, then cancel and delete. */
const Actions: React.FunctionComponent = () => {
  const { t: common } = useTranslation();
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
            commandfor={DELETE_ID}
            disabled={isSubmitting}
            size='small'
            type='button'
            variant='ghost'
          >
            {common('action', { context: 'cancel' })}
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
            {common('action', { context: 'delete' })}
          </Button>
        </ListItem>
      </List>
    </>
  );
};

export { Actions };
