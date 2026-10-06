import React from 'react';

import { useFormContext } from 'react-hook-form';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  PasswordInput,
} from 'design/components';

// Constants
import { COPY } from './constants';

// Schema
import type { PasswordValues } from './schema';

const Fields: React.FunctionComponent = () => {
  const { control } = useFormContext<PasswordValues>();

  return (
    <>
      <FormField
        control={control}
        name='CurrentPassword'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{COPY.currentPassword}</FormLabel>
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
            <FormLabel>{COPY.password}</FormLabel>
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
