import React from 'react';

// Components
import { Button, useFormContext } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Schema
import type { ProfileValues } from '@/views/me/profile/form/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const Save: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const {
    formState: { isSubmitting },
  } = useFormContext<ProfileValues>();

  return (
    <Button
      after={
        isSubmitting ? (
          <Tb.TbReload aria-hidden className='is-revolving' />
        ) : null
      }
      disabled={isSubmitting}
      size='small'
      type='submit'
      level='confirm'
    >
      {t('action', { context: 'save' })}
    </Button>
  );
};

export { Save };
