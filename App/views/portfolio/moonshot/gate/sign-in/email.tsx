import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import { EmailInput, FormField } from 'design/components';

// Schema
import type { SignInValues } from './schema';

const Email: React.FunctionComponent = () => {
  const translations = {
    common: useTranslation(),
    portfolio: useTranslation('portfolio'),
  };
  const { control } = useFormContext<SignInValues>();

  return (
    <FormField
      control={control}
      name='email'
      render={({ field }) => (
        <EmailInput
          {...field}
          label={translations.common.t('label', { context: 'email' })}
          autoComplete='username'
          placeholder={translations.portfolio.t('placeholder', {
            context: 'email',
          })}
        />
      )}
    />
  );
};

export { Email };
