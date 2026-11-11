import React from 'react';

// Components
import { FormField, Input, useFormContext } from 'design/components';

// Schema
import type { ProfileValues } from '@/views/me/profile/form/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const FirstName: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { control } = useFormContext<ProfileValues>();

  return (
    <FormField
      control={control}
      name='firstName'
      render={({ field }) => {
        return (
          <Input
            {...field}
            label={t('label', { context: 'first_name' })}
            autoComplete='given-name'
            placeholder={t('label', { context: 'first_name' })}
          />
        );
      }}
    />
  );
};

export { FirstName };
