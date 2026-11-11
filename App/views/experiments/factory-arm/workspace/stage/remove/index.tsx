import React from 'react';

// Libraries
import classNames from 'classnames';

// Components
import { Button } from 'design/components';

// Icons
import * as Tb from 'react-icons/tb';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { useSelectionContext } from '@/views/experiments/factory-arm/workspace/selection-context';
import { useObstaclesContext } from '@/views/experiments/factory-arm/workspace/obstacles-context';

// Overlays
import { toElement } from '@/views/experiments/factory-arm/workspace/stage/overlays';

/**
 * A button over the selected obstacle that takes it out of the cell, as the
 * Delete key does.
 */
const Remove: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { select, selected } = useSelectionContext();
  const { write } = useObstaclesContext();

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
      <Tb.TbTrash aria-hidden />
    </Button>
  );
};

export { Remove };
