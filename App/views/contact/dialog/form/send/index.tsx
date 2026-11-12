import React from 'react';

// Components
import { Button, useFormContext } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Spec
import type { Values } from '@/views/contact/dialog/form/spec';

const Send: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const {
    formState: { isSubmitting },
  } = useFormContext<Values>();

  return (
    <Button busy={isSubmitting} size='small' type='submit'>
      {t('action', { context: 'send' })}
    </Button>
  );
};

export { Send };
