import React from 'react';

// Components
import { Button, CardFooter, useFormContext } from 'design/components';

// Schema
import type { PasswordValues } from '@/views/me/password/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const Send: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const {
    formState: { isSubmitting },
  } = useFormContext<PasswordValues>();

  return (
    <CardFooter justifyContent='center'>
      <Button busy={isSubmitting} size='small' type='submit'>
        {t('action', { context: 'send' })}
      </Button>
    </CardFooter>
  );
};

export { Send };
