import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordInput,
} from 'design/components';

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
          <FormItem>
            <FormLabel>{t('label', { context: 'current_password' })}</FormLabel>
            <FormControl>
              <PasswordInput {...field} autoComplete='current-password' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='Password'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('label', { context: 'new_password' })}</FormLabel>
            <FormControl>
              <PasswordInput {...field} autoComplete='new-password' />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { Fields };
