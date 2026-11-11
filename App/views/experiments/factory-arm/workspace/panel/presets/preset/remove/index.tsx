import React from 'react';

// Components
import { Button } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePresetsContext } from '@/views/experiments/factory-arm/presets-context';

// Spec
import type * as Spec from '@/views/experiments/factory-arm/spec';

type Props = Pick<Spec.Preset, 'id'>;

/** Removes a preset the operator saved. */
const Remove: React.FunctionComponent<Props> = ({ id }) => {
  const { t } = useTranslation();
  const { discard } = usePresetsContext();

  return (
    <Button onClick={() => discard(id)} size='small' variant='ghost'>
      {t('action', { context: 'remove' })}
    </Button>
  );
};

export { Remove };
