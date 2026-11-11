import React from 'react';

// Components
import { Button, ListItem } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePendingContext } from '@/views/experiments/factory-arm/pending-context';

const Cancel: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { cancel } = usePendingContext();

  return (
    <ListItem>
      <Button onClick={cancel} size='small' variant='secondary'>
        {t('start_over', { context: 'cancel' })}
      </Button>
    </ListItem>
  );
};

export { Cancel };
