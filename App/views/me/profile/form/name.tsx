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
  Input,
} from 'design/components';

// Schema
import type { ProfileValues } from './schema';

const Name: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { control } = useFormContext<ProfileValues>();

  return (
    <>
      <FormField
        control={control}
        name='FirstName'
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('label', { context: 'first_name' })}</FormLabel>
            <FormControl>
              <Input
                {...field}
                autoComplete='given-name'
                placeholder={t('label', { context: 'first_name' })}
              />
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
            <FormLabel>{t('label', { context: 'last_name' })}</FormLabel>
            <FormControl>
              <Input
                {...field}
                autoComplete='family-name'
                placeholder={t('label', { context: 'last_name' })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { Name };
