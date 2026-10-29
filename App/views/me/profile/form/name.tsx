import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import { FormField, Input } from 'design/components';

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
          <Input
            {...field}
            label={t('label', { context: 'first_name' })}
            autoComplete='given-name'
            placeholder={t('label', { context: 'first_name' })}
          />
        )}
      />
      <FormField
        control={control}
        name='LastName'
        render={({ field }) => (
          <Input
            {...field}
            label={t('label', { context: 'last_name' })}
            autoComplete='family-name'
            placeholder={t('label', { context: 'last_name' })}
          />
        )}
      />
    </>
  );
};

export { Name };
