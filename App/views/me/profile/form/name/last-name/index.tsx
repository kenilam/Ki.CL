import React from 'react';

// Components
import { FormField, Input, useFormContext } from 'design/components';

// Schema
import type { ProfileValues } from '@/views/me/profile/form/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const LastName: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { control } = useFormContext<ProfileValues>();

  return (
    <FormField
      control={control}
      name='lastName'
      render={({ field }) => {
        return (
          <Input
            {...field}
            label={t('label', { context: 'last_name' })}
            autoComplete='family-name'
            placeholder={t('label', { context: 'last_name' })}
          />
        );
      }}
    />
  );
};

export { LastName };
