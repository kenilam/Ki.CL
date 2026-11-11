import React from 'react';

// Components
import { FormField, PasswordInput, useFormContext } from 'design/components';

// Schema
import type { DeleteValues } from '@/views/me/profile/delete/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const Password: React.FunctionComponent = () => {
  const { t: common } = useTranslation();
  const { control } = useFormContext<DeleteValues>();

  return (
    <FormField
      control={control}
      name='currentPassword'
      render={({ field }) => (
        <PasswordInput
          {...field}
          label={common('label', { context: 'password' })}
          autoComplete='current-password'
        />
      )}
    />
  );
};

export { Password };
