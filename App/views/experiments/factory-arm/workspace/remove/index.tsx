import React from 'react';

// Libraries
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

// Components
import { Button } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import { useFactoryArmContext } from '@/views/experiments/factory-arm/context';

// Overlays
import { toElement } from '@/views/experiments/factory-arm/scene/overlays';

/**
 * A button over the selected obstacle that takes it out of the cell, as the
 * Delete key does.
 */
const Remove: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { select, selected, write } = useFactoryArmContext();

  if (!selected) {
    return null;
  }

  return (
    <Button
      aria-label={t('action', { context: 'remove_obstacle' })}
      className={classNames(
        'kicl-inset-block-start-0',
        'kicl-inset-inline-start-0',
        'kicl-position-absolute'
      )}
      onClick={() => {
        select(null);
        write.withdraw(selected);
      }}
      ref={toElement('remove')}
      style={{ visibility: 'hidden' }}
      variant='secondary'
    >
      <Ri.RiDeleteBinLine aria-hidden />
    </Button>
  );
};

export { Remove };
