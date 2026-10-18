import React from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import {
  Button,
  Dialog,
  Heading,
  List,
  ListItem,
  Text,
} from 'design/components';

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
}) => {
  const { t } = useTranslation('factory-arm');

  return (
    <Dialog
      dense
      footer={
        <List autoFlow='column' gap='narrow' justifyContent='end'>
          <ListItem>
            <Button onClick={onCancel} size='small' variant='secondary'>
              {t('start_over', { context: 'cancel' })}
            </Button>
          </ListItem>
          <ListItem>
            <Button onClick={onConfirm} size='small'>
              {t('start_over', { context: 'confirm' })}
            </Button>
          </ListItem>
        </List>
      }
      header={
        <Heading dense is='h2' lookLike='h4'>
          {t('start_over', { context: 'title' })}
        </Heading>
      }
      onClose={onCancel}
      open={open}
      role='alertdialog'
    >
      <Text className='kicl-font-size-small' is='p'>
        {t('start_over', { context: 'message' })}
      </Text>
    </Dialog>
  );
};

export { Confirm };
