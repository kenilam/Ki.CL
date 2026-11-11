import React from 'react';

// Components
import { Button, useFormContext } from 'design/components';

// Schema
import type { ProfileValues } from '@/views/me/profile/form/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const Reset: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const {
    formState: { isSubmitting },
  } = useFormContext<ProfileValues>();

  return (
    <Button
      disabled={isSubmitting}
      size='small'
      type='reset'
      variant='secondary'
    >
      {t('action', { context: 'reset' })}
    </Button>
  );
};

export { Reset };
