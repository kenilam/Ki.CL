import React from 'react';

// Components
import { Button, CardFooter } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useConfirmContext } from '@/views/me/password/confirm/context';

const Submit: React.FunctionComponent = () => {
  const { t } = useTranslation();
  const { checking, confirmed, loading, onClick } = useConfirmContext();

  if (confirmed || checking) {
    return null;
  }

  return (
    <CardFooter justifyContent='center'>
      <Button
        after={
          loading ? <Tb.TbReload aria-hidden className='is-revolving' /> : null
        }
        disabled={loading}
        onClick={onClick}
        size='small'
      >
        {t('action', { context: 'confirm' })}
      </Button>
    </CardFooter>
  );
};

export { Submit };
