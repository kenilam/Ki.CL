import React from 'react';

// Components
import { Segmented } from 'design/components';

// Hooks
import { useTranslation } from 'design/hooks';

// Context
import { usePanelContext } from '@/views/experiments/factory-arm/panel-context';

// Partials
import { Tab } from './tab';

// Constants
import { TABS } from '@/views/experiments/factory-arm/workspace/panel/tabs/constants';

/** Switches the panel between presets and the manual setup. */
const Switch: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { setTab, tab } = usePanelContext();

  return (
    <Segmented
      aria-label={t('setup')}
      onValueChange={(value) => {
        setTab(value as (typeof TABS)[number]);
      }}
      value={tab}
    >
      {TABS.map((name) => {
        return <Tab key={name} name={name} />;
      })}
    </Segmented>
  );
};

export { Switch };
