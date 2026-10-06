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
import { COPY } from '@/views/me/profile/constants';

// Schema
import type { DeleteValues } from './schema';

const Password: React.FunctionComponent = () => {
  const { control } = useFormContext<DeleteValues>();

  return (
    <FormField
      control={control}
      name='CurrentPassword'
      render={({ field }) => (
        <FormItem>
          <FormLabel>{COPY.yourPassword}</FormLabel>
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
