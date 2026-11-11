import React from 'react';

// Components
import { Animation, Text, useFormContext } from 'design/components';

// Views
import { RootError } from '@/views/root-error';

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
    return <RootError />;
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
