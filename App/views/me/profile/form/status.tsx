import React from 'react';

import { useFormContext } from 'react-hook-form';

// Components
import { Animation, Text } from 'design/components';

// Views
import { RootError } from '@/views/root-error';

// Constants
import { COPY } from '@/views/me/profile/constants';

// Schema
import type { ProfileValues } from './schema';

/** The API's error, or that the last save went through. */
const Status: React.FunctionComponent = () => {
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
          {COPY.saved}
        </Text>
      </Animation>
    );
  }

  return null;
};

export { Status };
