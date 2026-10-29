import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import { FormField, PasswordInput } from 'design/components';

// Schema
import type { PasswordValues } from './schema';

const Fields: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { control } = useFormContext<PasswordValues>();

  return (
    <>
      <FormField
        control={control}
        name='CurrentPassword'
        render={({ field }) => (
          <PasswordInput
            {...field}
            label={t('label', { context: 'current_password' })}
            autoComplete='current-password'
          />
        )}
      />
      <FormField
        control={control}
        name='Password'
        render={({ field }) => (
          <PasswordInput
            {...field}
            label={t('label', { context: 'new_password' })}
            autoComplete='new-password'
          />
        )}
      />
    </>
  );
};

export { Fields };
