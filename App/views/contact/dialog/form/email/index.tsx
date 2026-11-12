import React from 'react';

// Components
import { EmailInput, FormField, useFormContext } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { EMAIL } from '@/views/contact/dialog/form/constants';

// Spec
import type { Values } from '@/views/contact/dialog/form/spec';

const Email: React.FunctionComponent = () => {
  const { control } = useFormContext<Values>();
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name='email'
      render={({ field }) => {
        return (
          <EmailInput
            {...field}
            label={t('label', { context: 'email' })}
            placeholder={t('placeholder', { context: 'email' })}
          />
        );
      }}
      rules={{
        pattern: {
          message: t('error', { context: 'email_invalid' }),
          value: EMAIL,
        },
        required: t('error', { context: 'email_required' }),
      }}
    />
  );
};

export { Email };
