import React from 'react';

// Components
import { FormField, Textarea, useFormContext } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import {
  MESSAGE_LENGTH,
  RETENTION_DAYS,
} from '@/views/contact/dialog/form/constants';

// Spec
import type { Values } from '@/views/contact/dialog/form/spec';

const Message: React.FunctionComponent = () => {
  const { control } = useFormContext<Values>();
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name='message'
      render={({ field }) => {
        return (
          <Textarea
            {...field}
            description={t('privacy', { days: RETENTION_DAYS })}
            label={t('label', { context: 'message' })}
            rows={6}
          />
        );
      }}
      rules={{
        maxLength: {
          message: t('error', {
            context: 'message_long',
            max: MESSAGE_LENGTH,
          }),
          value: MESSAGE_LENGTH,
        },
        required: t('error', { context: 'message_required' }),
        validate: (value) => {
          return (
            Boolean(value.trim()) || t('error', { context: 'message_required' })
          );
        },
      }}
    />
  );
};

export { Message };
