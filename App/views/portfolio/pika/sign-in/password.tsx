import React from 'react';

import { useFormContext } from 'react-hook-form';

// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@/components';

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
            <Input {...field} autoComplete='current-password' type='password' />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Password };
