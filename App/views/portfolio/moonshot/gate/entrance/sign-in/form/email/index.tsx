import React from 'react';

// Components
import { EmailInput, FormField, useFormContext } from 'design/components';

// Schema
import type { SignInValues } from '@/views/portfolio/moonshot/gate/entrance/sign-in/form/schema';

// Hooks
import { useTranslation } from 'design/hooks';

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
