import React from 'react';

// Components
import { FormField, PasswordInput, useFormContext } from 'design/components';

// Schema
import type { PasswordValues } from '@/views/me/password/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const CurrentPassword: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { control } = useFormContext<PasswordValues>();

  return (
    <FormField
      control={control}
      name='currentPassword'
      render={({ field }) => {
        return (
          <PasswordInput
            {...field}
            label={t('label', { context: 'current_password' })}
            autoComplete='current-password'
          />
        );
      }}
    />
  );
};

export { CurrentPassword };
