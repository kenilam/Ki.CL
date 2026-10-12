import React from 'react';

import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

// Components
import { Animation, Text } from 'design/components';

// Views
import { RootError } from '@/views/root-error';

// Schema
import type { ProfileValues } from './schema';

/** The API's error, or that the last save went through. */
const Status: React.FunctionComponent = () => {
  const { t: common } = useTranslation();
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
          {common('status', { context: 'saved' })}
        </Text>
      </Animation>
    );
  }

  return null;
};

export { Status };
