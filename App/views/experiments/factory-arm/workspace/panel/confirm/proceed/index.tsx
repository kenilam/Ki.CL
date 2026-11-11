import React from 'react';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePendingContext } from '@/views/experiments/factory-arm/pending-context';
import { useRunContext } from '@/views/experiments/factory-arm/run-context';

/** Builds the cell again with the setup that was waiting on the answer. */
const Proceed: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { cancel, pending } = usePendingContext();
  const { proceed } = useRunContext();

  const confirm = () => {
    cancel();

    if (!pending) {
      return;
    }

    proceed(pending);
  };

  return (
    <ListItem>
      <Button onClick={confirm} size='small'>
        {t('start_over', { context: 'confirm' })}
      </Button>
    </ListItem>
  );
};

export { Proceed };
