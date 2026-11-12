import React from 'react';

// Components
import {
  Animation,
  FormMessage,
  Text,
  useFormContext,
} from 'design/components';

// Schema
import type { ProfileValues } from '@/views/me/profile/form/schema';

// Hooks
import { useTranslation } from 'design/hooks';

/** The API's error, or that the last save went through. */
const Status: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const {
    formState: { errors, isDirty, isSubmitSuccessful },
  } = useFormContext<ProfileValues>();

  if (errors.root?.message) {
    return <FormMessage name='root' />;
  }

  // Gone once something is typed again.
  if (isSubmitSuccessful && !isDirty) {
    return (
      <Animation property='slide-from-top'>
        <Text is='p' role='status'>
          {t('status', { context: 'saved' })}
        </Text>
      </Animation>
    );
  }

  return null;
};

export { Status };
