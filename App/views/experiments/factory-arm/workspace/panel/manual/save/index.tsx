import React from 'react';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Partials
import { useSave } from './use-save';

const Save: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const save = useSave();

  return (
    <Button
      className='kicl-inline-size-full'
      justifyContent='center'
      onClick={save}
      size='small'
      variant='secondary'
    >
      {t('action', { context: 'save' })}
    </Button>
  );
};

export { Save };
