import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import { FormField, PasswordInput } from 'design/components';

// Schema
import type { SignInValues } from './schema';

const Password: React.FunctionComponent = () => {
  const { t: common } = useTranslation();
  const { control } = useFormContext<SignInValues>();

  return (
    <FormField
      control={control}
      name='Password'
      render={({ field }) => (
        <PasswordInput
          {...field}
          label={common('label', { context: 'password' })}
        />
      )}
    />
  );
};

export { Password };
