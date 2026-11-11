import React from 'react';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSignOutContext } from '@/views/account/sign-out/context';

const Confirm: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { confirm } = useSignOutContext();

  return (
    <ListItem>
      <Button onClick={confirm} variant='ghost'>
        {t('action', { context: 'sign_out' })}
      </Button>
    </ListItem>
  );
};

export { Confirm };
