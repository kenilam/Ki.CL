import React from 'react';

// Components
import { Button, ListItem, useFormContext } from 'design/components';

// Schema
import type { DeleteValues } from '@/views/me/profile/delete/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const Submit: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const {
    formState: { isSubmitting },
  } = useFormContext<DeleteValues>();

  return (
    <ListItem>
      <Button
        disabled={isSubmitting}
        level='error'
        size='small'
        type='submit'
        variant='secondary'
      >
        {t('action', { context: 'delete' })}
      </Button>
    </ListItem>
  );
};

export { Submit };
