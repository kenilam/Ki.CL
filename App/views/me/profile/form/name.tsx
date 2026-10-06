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
} from 'design/components';

// Constants
import { COPY } from '@/views/me/profile/constants';

// Schema
import type { ProfileValues } from './schema';

const Name: React.FunctionComponent = () => {
  const { control } = useFormContext<ProfileValues>();

  return (
    <>
      <FormField
        control={control}
        name='FirstName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{COPY.firstName}</FormLabel>
            <FormControl>
              <Input {...field} autoComplete='given-name' placeholder={COPY.firstName} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name='LastName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{COPY.lastName}</FormLabel>
            <FormControl>
              <Input {...field} autoComplete='family-name' placeholder={COPY.lastName} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { Name };
