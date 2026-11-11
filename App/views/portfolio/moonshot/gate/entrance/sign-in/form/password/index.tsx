import React from 'react';

// Components
import { FormField, PasswordInput, useFormContext } from 'design/components';

// Schema
import type { SignInValues } from '@/views/portfolio/moonshot/gate/entrance/sign-in/form/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const Password: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { control } = useFormContext<SignInValues>();

  return (
    <FormField
      control={control}
      name='password'
      render={({ field }) => (
        <PasswordInput {...field} label={t('label', { context: 'password' })} />
      )}
    />
  );
};

export { Password };
