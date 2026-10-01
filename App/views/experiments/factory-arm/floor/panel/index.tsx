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
import { Help } from './help';
import { Log } from './log';
import { Shapes } from './shapes';
import { Simulations } from './simulations';
import { Unsaved } from './unsaved';

// Constants
import {
  CLASS_NAME,
  COPY,
  PANEL,
  WIDE,
} from '@/views/experiments/factory-arm/floor/constants';

const TABS = ['simulations', 'obstacles'] as const;

type Tab = (typeof TABS)[number];

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
  const {
    bridge,
    embodied,
    linked,
    remote,
    stations,
    struck,
    toggleRemote,
    troubled,
  } = useHub();
  const hits = Object.entries(struck);
  const on = stations
    .map(({ arm }) => arm)
    .filter((arm) => linked[arm] !== undefined && linked[arm] !== 'worker');
  const bodies = on.filter((arm) => embodied[arm]);
  // Some arm is still on its way to where the switch sent it: a station says `worker` or the bridge's address.
  const switching = stations.some(
    ({ arm }) => ((linked[arm] ?? 'worker') === 'worker') === remote
  );
  // An arm on the bridge whose last word was a warning or an error.
  const trouble = on.some((arm) => troubled[arm]);

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
        frames='auto--max-content--max-content--max-content'
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

          {/* Nothing to dial without an address, so the button stays but does nothing. */}
          <Button
            aria-pressed={remote}
            disabled={!bridge}
            level={
              !switching && remote ? (trouble ? 'warning' : 'confirm') : undefined
            }
            onClick={toggleRemote}
            variant={remote ? 'ghost' : 'secondary'}
            title={COPY.panel.ai}
          >
            {switching ? (
              <Ri.RiLoader4Line aria-hidden className='is-revolving' />
            ) : trouble ? (
              <Ri.RiAlertFill aria-hidden />
            ) : (
              <Ri.RiRobot2Fill aria-hidden />
            )}
            <span className='kicl-hidden'>{switching ? COPY.panel.switching : COPY.panel.ai}</span>
          </Button>

          <Button
            aria-pressed={logging}
            onClick={() => setLogging((current) => !current)}
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
        in={!switching && remote}
        level='info'
        message={COPY.panel.physical.message(on, bodies)}
        title={COPY.panel.physical.title}
      />

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
          <Help rows={COPY.panel.floor.keys} title={COPY.panel.floor.help} />
          <Unsaved />
        </>
      ) : (
        <Shapes />
      )}
    </Sheet>
  );
};

export { Panel };
