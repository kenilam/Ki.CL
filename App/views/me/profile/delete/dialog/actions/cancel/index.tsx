import React from 'react';

// Components
import { Button, ListItem, useFormContext } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { DELETE_ID } from '@/views/me/profile/constants';

// Schema
import type { DeleteValues } from '@/views/me/profile/delete/schema';

const Cancel: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const {
    formState: { isSubmitting },
  } = useFormContext<DeleteValues>();

  return (
    <ListItem>
      <Button
        command='request-close'
        commandfor={DELETE_ID}
        disabled={isSubmitting}
        size='small'
        type='button'
        variant='ghost'
      >
        {t('action', { context: 'cancel' })}
      </Button>
    </ListItem>
  );
};

export { Cancel };
