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

// Schema
import type { SignInValues } from './schema';

const Password: React.FunctionComponent = () => {
  const { control } = useFormContext<SignInValues>();

  return (
    <FormField
      control={control}
      name='Password'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Password</FormLabel>
          <FormControl>
            <PasswordInput {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Password };
