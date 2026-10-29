import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import { EmailInput, FormField } from 'design/components';

// Schema
import type { SignInValues } from './schema';

const Email: React.FunctionComponent = () => {
  const { t } = useTranslation('portfolio');
  const { t: common } = useTranslation();
  const { control } = useFormContext<SignInValues>();

  return (
    <FormField
      control={control}
      name='Email'
      render={({ field }) => (
        <EmailInput
          {...field}
          label={common('label', { context: 'email' })}
          autoComplete='username'
          placeholder={t('placeholder', { context: 'email' })}
        />
      )}
    />
  );
};

export { Email };
