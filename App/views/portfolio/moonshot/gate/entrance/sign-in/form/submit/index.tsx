import React from 'react';

// Components
import { Button, CardFooter, useFormContext } from 'design/components';

// Schema
import type { SignInValues } from '@/views/portfolio/moonshot/gate/entrance/sign-in/form/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const Submit: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const {
    formState: { isSubmitting },
  } = useFormContext<SignInValues>();

  return (
    <CardFooter justifyContent='center'>
      <Button busy={isSubmitting} type='submit' size='small'>
        {t('action', { context: 'sign_in' })}
      </Button>
    </CardFooter>
  );
};

export { Submit };
