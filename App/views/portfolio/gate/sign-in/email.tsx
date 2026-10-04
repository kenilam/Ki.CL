import React from 'react';

import { useFormContext } from 'react-hook-form';

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
  const { control } = useFormContext<SignInValues>();

  return (
    <FormField
      control={control}
      name='Email'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <EmailInput
              {...field}
              autoComplete='username'
              placeholder='you@example.com'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Email };
