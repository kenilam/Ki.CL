import React from 'react';

// Components
import { Sheet } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePanelContext } from '@/views/experiments/factory-arm/panel-context';

// Partials
import { Confirm } from './confirm';
import { Log } from './log';
import { Manual } from './manual';
import { Presets } from './presets';
import { Tabs } from './tabs';

// Constants
import { CLASS_NAME, PANEL } from '@/views/experiments/factory-arm/constants';

/**
 * How the next run is set up, from a preset or by hand, and a log of every
 * step the cell takes. It stands beside the stage and folds away; a click on
 * the stage leaves it open. It outlives the runs, open as it was left.
 */
const Panel: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { open, setOpen, tab } = usePanelContext();

  return (
    <Sheet
      aria-label={t('setup')}
      className={`${CLASS_NAME}__panel`}
      defaultOpen={open}
      header={<Tabs />}
      id={PANEL}
      onOpenChange={setOpen}
    >
      {tab === 'preset' ? <Presets /> : null}
      {tab === 'manual' ? <Manual /> : null}
      {tab === 'log' ? <Log /> : null}

      <Confirm />
    </Sheet>
  );
};

export { Panel };
