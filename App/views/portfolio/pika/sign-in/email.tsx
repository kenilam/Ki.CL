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
            <Input
              {...field}
              autoComplete='username'
              placeholder='you@example.com'
              type='email'
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export { Email };
