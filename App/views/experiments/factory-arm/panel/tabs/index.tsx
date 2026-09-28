import React from 'react';

// Components
import {
  Button,
  CardHeader,
  Layout,
  Segmented,
  SegmentedItem,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import { useSetup } from '@/views/experiments/factory-arm/setup';

// Constants
import { COPY, PANEL } from '@/views/experiments/factory-arm/constants';

const TABS = ['preset', 'manual', 'log'] as const;

/**
 * Switches the panel between presets and the manual setup. On small screens
 * it also closes the panel.
 */
const Tabs: React.FunctionComponent = () => {
  const { setTab, tab } = useSetup();

  return (
    <CardHeader>
      <Layout
        alignItems='center'
        autoFlow='column'
        frames='1fr--max-content'
        gap='narrow'
      >
        <div>
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
            popoverTarget={PANEL}
            popoverTargetAction='hide'
            size='small'
            variant='ghost'
          >
            <Ri.RiCloseLine aria-hidden />
            <span className='kicl-hidden'>{COPY.panel.close}</span>
          </Button>
        </div>
      </Layout>
    </CardHeader>
  );
};

export { Tabs };
