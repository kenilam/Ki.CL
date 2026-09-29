import React, { useState } from 'react';

// Components
import {
  Button,
  Layout,
  Segmented,
  SegmentedItem,
  Sheet,
  SheetHeader,
  Status,
} from '@/components';

// Icons
import { Ri } from '@/icons';

// Context
import { useHub } from '@/views/experiments/factory-arm/floor/hub';

// Partials
import { Log } from './log';
import { Shapes } from './shapes';
import { Simulations } from './simulations';
import { Unsaved } from './unsaved';

// Constants
import {
  CLASS_NAME,
  COPY,
  PANEL,
} from '@/views/experiments/factory-arm/floor/constants';

const TABS = ['simulations', 'obstacles'] as const;

type Tab = (typeof TABS)[number];

/** Wider than a tablet, where the panel stands beside the stage. */
const WIDE = '(min-width: 737px)';

/**
 * The simulations to play and the obstacles to add, beside the stage, and
 * the log, which opens from its button and goes back to the tab it came
 * from when pressed again. On small screens the panel folds away.
 */
const Panel: React.FunctionComponent = () => {
  // The tab stays chosen while the log is over it, so closing the log goes back to it.
  const [tab, setTab] = useState<Tab>('simulations');
  const [logging, setLogging] = useState(false);
  const [open] = useState(() => matchMedia(WIDE).matches);
  const { struck } = useHub();
  const hits = Object.entries(struck);

  return (
    <Sheet
      aria-label={COPY.panel.label}
      className={`${CLASS_NAME}__panel`}
      defaultOpen={open}
      id={PANEL}
    >
      <Layout
        alignItems='center'
        autoFlow='column'
        frames='auto--max-content--max-content'
        gap='narrow'
      >
        <SheetHeader>
          <Segmented
            aria-label={COPY.panel.label}
            onValueChange={(value) => {
              setTab(value as Tab);
              setLogging(false);
            }}
            // No segment lit while the log is over the tab.
            value={logging ? '' : tab}
          >
            {TABS.map((name) => (
              <SegmentedItem key={name} value={name}>
                {COPY.panel[name]}
              </SegmentedItem>
            ))}
          </Segmented>

          <Button
            aria-pressed={logging}
            level='confirm'
            onClick={() => setLogging((current) => !current)}
            size='small'
            variant={logging ? 'primary' : 'secondary'}
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

      <Status
        align='start'
        headingLevel='h3'
        in={hits.length > 0}
        level='error'
        message={hits
          .map(([arm, obstacles]) => COPY.panel.struck.message(arm, obstacles))
          .join(' ')}
        title={COPY.panel.struck.title}
      />

      {logging ? (
        <Log />
      ) : tab === 'simulations' ? (
        <>
          <Simulations />
          <Unsaved />
        </>
      ) : (
        <Shapes />
      )}
    </Sheet>
  );
};

export { Panel };
