import React, { useEffect, useRef } from 'react';

// Libraries
import { useTranslation } from 'react-i18next';

// Components
import { Button, Menu, Segmented, SegmentedItem } from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

const TABS = ['preset', 'manual'] as const;

/**
 * Switches the panel between presets and the manual setup, and opens the
 * log, which goes back to the tab it came from when pressed again. It's the
 * panel's header, beside the button that closes the panel.
 */
const Tabs: React.FunctionComponent = () => {
  const { t } = useTranslation('factory-arm');
  const { setTab, tab } = useSetup();
  // The tab the log goes back to.
  const back = useRef<(typeof TABS)[number]>('preset');

  useEffect(() => {
    if (tab !== 'log') {
      back.current = tab;
    }
  }, [tab]);

  const logging = tab === 'log';

  return (
    <Menu
      alignItems='center'
      autoFlow='column'
      frames='auto--max-content'
      gap='narrow'
    >
      <Segmented
        aria-label={t('setup')}
        onValueChange={(value) => setTab(value as (typeof TABS)[number])}
        value={tab}
      >
        {TABS.map((name) => (
          <SegmentedItem key={name} value={name}>
            {t('tab', { context: name })}
          </SegmentedItem>
        ))}
      </Segmented>

      <Button
        aria-label={t('tab', { context: 'log' })}
        aria-pressed={logging}
        onClick={() => setTab(logging ? back.current : 'log')}
        size='small'
        variant={logging ? 'primary' : 'secondary'}
        level='confirm'
      >
        <Ri.RiFile4Line aria-hidden />
      </Button>
    </Menu>
  );
};

export { Tabs };
