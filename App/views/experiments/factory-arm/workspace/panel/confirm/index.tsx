import React from 'react';

// Components
import { Dialog, List } from 'design/components';

// Context
import { usePendingContext } from '@/views/experiments/factory-arm/pending-context';

// Partials
import { Cancel } from './cancel';
import { Message } from './message';
import { Proceed } from './proceed';
import { Title } from './title';

import { MESSAGE_ID, TITLE_ID } from './constants';

/**
 * Asks before building the cell again while the arm is working, since that
 * drops what it has queued and the case on its pad.
 */
const Confirm: React.FunctionComponent = () => {
  const { cancel, pending } = usePendingContext();

  return (
    <Dialog
      aria-describedby={MESSAGE_ID}
      aria-labelledby={TITLE_ID}
      closable='keyboard'
      footer={
        <List autoFlow='column' gap='narrow' justifyContent='center'>
          <Cancel />
          <Proceed />
        </List>
      }
      onClose={cancel}
      open={pending !== null}
      role='alertdialog'
    >
      <Title />
      <Message />
    </Dialog>
  );
};

export { Confirm };
