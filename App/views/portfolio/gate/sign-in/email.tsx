import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import {
  EmailInput,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'design/components';

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
        <FormItem>
          <FormLabel>{common('label', { context: 'email' })}</FormLabel>
          <FormControl>
            <EmailInput
              {...field}
              autoComplete='username'
              placeholder={t('placeholder', { context: 'email' })}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Email };
