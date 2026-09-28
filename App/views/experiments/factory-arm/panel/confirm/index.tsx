import React from 'react';

// Components
import { Button, Dialog, Layout, Text } from '@/components';

// Constants
import { COPY } from '@/views/experiments/factory-arm/constants';

type Props = {
  /** Whether to ask. */
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

/**
 * Asks before building the cell again while the arm is working, since that
 * drops what it has queued and the case on its pad.
 */
const Confirm: React.FunctionComponent<Props> = ({
  onCancel,
  onConfirm,
  open,
}) => (
  <Dialog
    dense
    footer={
      <Layout autoFlow='column' gap='narrow' justifyContent='end'>
        <div>
          <Button onClick={onCancel} size='small' variant='secondary'>
            {COPY.panel.busy.cancel}
          </Button>
          <Button onClick={onConfirm} size='small'>
            {COPY.panel.busy.confirm}
          </Button>
        </div>
      </Layout>
    }
    onClose={onCancel}
    open={open}
    role='alertdialog'
    title={COPY.panel.busy.title}
  >
    <Text className='kicl-font-size-small' is='p'>
      {COPY.panel.busy.message}
    </Text>
  </Dialog>
);

export { Confirm };
