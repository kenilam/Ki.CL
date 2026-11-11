import React from 'react';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { DELETE_ID } from '@/views/me/profile/constants';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation('me');

  return (
    <Button
      command='show-modal'
      commandfor={DELETE_ID}
      level='error'
      size='small'
      variant='secondary'
    >
      {t('action', { context: 'delete_account' })}
    </Button>
  );
};

export { Open };
