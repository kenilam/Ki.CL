import React from 'react';

// Components
import { Animation, Heading, useFormState } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useDeleteContext } from '@/views/me/profile/delete/context';

// Constants
import { TITLE_ID } from '@/views/me/profile/constants';

const Title: React.FunctionComponent = () => {
  const { t } = useTranslation('me');
  const { form } = useDeleteContext();
  const { isSubmitting } = useFormState({ control: form.control });

  return (
    <Animation property='slide-from-top'>
      <Heading dense id={TITLE_ID}>
        {t('title', { context: isSubmitting ? 'deleting' : 'delete' })}
      </Heading>
    </Animation>
  );
};

export { Title };
