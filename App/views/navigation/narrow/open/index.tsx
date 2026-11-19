import React from 'react';

// Components
import { Button } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Constants
import { CLASS_NAME } from '@/views/navigation/narrow/constants';

const Open: React.FunctionComponent = () => {
  const { t } = useTranslation();

  return (
    <Button
      aria-label={t('action', { context: 'open_navigation' })}
      block
      command='show-modal'
      commandfor={CLASS_NAME}
      size='small'
      variant='tertiary'
    >
      <Tb.TbMenu2 aria-hidden />
    </Button>
  );
};

export { Open };
