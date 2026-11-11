import React from 'react';

// Components
import { FormField, PasswordInput, useFormContext } from 'design/components';

// Schema
import type { PasswordValues } from '@/views/me/password/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const NewPassword: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { control } = useFormContext<PasswordValues>();

  return (
    <FormField
      control={control}
      name='password'
      render={({ field }) => {
        return (
          <PasswordInput
            {...field}
            label={t('label', { context: 'new_password' })}
            autoComplete='new-password'
          />
        );
      }}
    />
  );
};

export { NewPassword };
