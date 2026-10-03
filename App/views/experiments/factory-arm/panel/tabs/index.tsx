import React, { useEffect, useRef } from 'react';

// Components
import {
  Button,
  Layout,
  Segmented,
  SegmentedItem,
  SheetHeader,
} from 'design/components';

// Icons
import * as Ri from 'react-icons/ri';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Constants
import { COPY, PANEL } from '@/views/experiments/factory-arm/constants';

const TABS = ['preset', 'manual'] as const;

/**
 * Switches the panel between presets and the manual setup, and opens the
 * log, which goes back to the tab it came from when pressed again. On small
 * screens it also closes the panel.
 */
const Tabs: React.FunctionComponent = () => {
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
    <Layout
      alignItems='center'
      autoFlow='column'
      frames='auto--max-content--max-content'
      gap='narrow'
    >
      <SheetHeader>
        <Segmented
          aria-label={COPY.panel.label}
          onValueChange={(value) => setTab(value as (typeof TABS)[number])}
          value={tab}
        >
          {TABS.map((name) => (
            <SegmentedItem key={name} value={name}>
              {COPY.panel[name]}
            </SegmentedItem>
          ))}
        </Segmented>

        <Button
          aria-pressed={logging}
          onClick={() => setTab(logging ? back.current : 'log')}
          size='small'
          variant={logging ? 'primary' : 'secondary'}
          level='confirm'
        >
          <Ri.RiFile4Line aria-hidden />
          <span className='kicl-hidden'>{COPY.panel.log}</span>
        </Button>

        <Button
          popoverTarget={PANEL}
          popoverTargetAction='hide'
          size='small'
          variant='ghost'
        >
          <Ri.RiCloseLine aria-hidden />
          <span className='kicl-hidden'>{COPY.panel.close}</span>
        </Button>
      </SheetHeader>
    </Layout>
  );
};

export { Tabs };
