import React from 'react';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { SIGN_OUT_ID } from '@/views/account/constants';

const Cancel: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <ListItem>
      <Button
        command='request-close'
        commandfor={SIGN_OUT_ID}
        variant='tertiary'
      >
        {t('action', { context: 'cancel' })}
      </Button>
    </ListItem>
  );
};

export { Cancel };
