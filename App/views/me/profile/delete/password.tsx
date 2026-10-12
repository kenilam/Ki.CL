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
import type { DeleteValues } from './schema';

const Password: React.FunctionComponent = () => {
  const { t: common } = useTranslation();
  const { control } = useFormContext<DeleteValues>();

  return (
    <FormField
      control={control}
      name='CurrentPassword'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{common('label', { context: 'password' })}</FormLabel>
          <FormControl>
            <PasswordInput {...field} autoComplete='current-password' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Password };
