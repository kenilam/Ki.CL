import React from 'react';

// Components
import { Button, CardFooter, useFormContext } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Schema
import type { SignInValues } from '@/views/portfolio/moonshot/gate/entrance/sign-in/form/schema';

// Hooks
import { useTranslation } from 'design/hooks';

const Submit: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const {
    formState: { isSubmitting },
  } = useFormContext<SignInValues>();

  return (
    <CardFooter justifyContent='center'>
      <Button
        after={
          isSubmitting ? (
            <Tb.TbReload aria-hidden className='is-revolving' />
          ) : null
        }
        disabled={isSubmitting}
        type='submit'
        size='small'
      >
        {t('action', { context: 'sign_in' })}
      </Button>
    </CardFooter>
  );
};

export { Submit };
